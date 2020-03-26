const crypto = require('crypto');
const connection = require('../src/database/connection');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');
    
        return response.json(users);
    },
    
    async create(request, response) {
        const { name, email, phoneNumber, city, uf, country } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('users').insert({
            id,
            name,
            email,
            phoneNumber,
            city,
            uf,
            country,
        });

        return response.json({ id });
    }
};