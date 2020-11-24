const fileModel = require('../models/file');

module.exports = {
  async create(req, res) {
    console.log('started');
    const { description } = req.body;

    if (!req.files || !description)
      return res.status(400).send({ message: 'Not file uploaded' });

    let images = [];

    console.log('pushed');
    req.files.forEach((image) => {
      let uploadedImage = image.location;
      images.push(uploadedImage);
    });

    console.log('create model');
    const newUploadedFile = new fileModel({
      filename: images,
      description,
    });

    console.log('saving model');
    await newUploadedFile.save();

    console.log('send json');
    return res.json(newUploadedFile);
  },

  async remove(req, res) {
    const file = await fileModel.findById(req.params.id);
    if (!file) return res.status(400).send({ message: 'File not found' });

    res.send();
  },

  async findAll(req, res) {
    const uploads = await fileModel.find();
    res.json(uploads);
  },
};
