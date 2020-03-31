const connection = require('../src/database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const user = await connection('users')
            .select('name')
            .where('id', id)
            .first();

        if (!user) {
            return response.status(400).json({ error: 'Esta usuário não existe'})
        }

        return response.json(user);
    }
}