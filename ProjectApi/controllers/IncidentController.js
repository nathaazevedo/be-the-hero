const connection = require('../src/database/connection');

module.exports = {
    async get(request, response) {
        const { page } = request.query;

        const [count] = await connection('incidents').count();

        const itensNumber = 5;

        const incidents = await connection('incidents')
            .select([
                'incidents.*',
                'users.name',
                'users.email',
                'users.phoneNumber',
                'users.city',
                'users.uf',
                'users.country'])
            .join('users', 'users.id', '=', 'incidents.user_id')
            .offset((page - 1) * itensNumber)
            .limit(itensNumber);

        response.header('X-Total_Count', count['count(*)']);

        return response.json(incidents);
    },

    async getMyIncidents(request, response) {
        const user_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .select('*')
            .where('user_id', user_id);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;

        const user_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            user_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;

        const user_id = request.headers.authorization;

        const incident = await connection('incidents')
            .select('user_id')
            .where('id', id)
            .first();

        if (!incident) {
            if (incident.user_id != user_id) {
                return response.status(401).json({ error: 'Operação não permitida' });
            }

            await connection('incidents').where('id', id).delete();
        }

        return response.status(204).send();
    }
}