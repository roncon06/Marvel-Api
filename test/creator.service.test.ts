const request = require('supertest');
const app = require('../app');
const creatorModel = require('../models/creator.model');

describe('Testes end-to-end para a rota POST /creators', () => {
    it('Deve criar um novo criador', async () => {
        const newCreator = {
            suffix: 'Sr.',
            fullName: 'John Doe',
            comics: {
                available: 10,
                returned: 5,
                collectionURI: 'http://example.com',
                items: [
                    {
                        resourceURI: 'http://example.com/comic/1',
                        name: 'Comic 1'
                    },
                    {
                        resourceURI: 'http://example.com/comic/2',
                        name: 'Comic 2'
                    }
                ]
            }
        };

        const response = await request(app)
            .post('/creators')
            .send(newCreator)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.suffix).toBe(newCreator.suffix);
        expect(response.body.fullName).toBe(newCreator.fullName);
        expect(response.body.comics).toHaveProperty('available', newCreator.comics.available);
        expect(response.body.comics).toHaveProperty('returned', newCreator.comics.returned);
        expect(response.body.comics).toHaveProperty('collectionURI', newCreator.comics.collectionURI);
        expect(response.body.comics.items).toHaveLength(newCreator.comics.items.length);
    });
});