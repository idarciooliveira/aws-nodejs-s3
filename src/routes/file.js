const route = require('express').Router();
const multerConfig = require('../helpers/multer');
const multer = require('multer');

const { create, remove, findAll } = require('../controllers/fileController');

route.get('/', (req, res) => res.json({ hello: 'AWS' }));
route.post('/upload', multer(multerConfig).array('files', 5), create);
route.delete('/upload/:id', remove);
route.get('/files', findAll);

module.exports = route;
