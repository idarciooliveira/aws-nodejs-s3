const route = require('express').Router();
const { create, remove, findAll } = require('../controllers/fileController');

route.get('/', (req, res) => res.json({ hello: 'AWS' }));
route.post('/upload', create);
route.delete('/upload/:id', remove);
route.get('/files', findAll);

module.exports = route;
