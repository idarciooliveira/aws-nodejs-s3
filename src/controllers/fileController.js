const imageUtl = require('../helpers/imageUtil');
const fileModel = require('../models/file');

module.exports = {
  async create(req, res) {
    const { description } = req.body;

    if (!req.files || !description)
      return res.status(400).send({ message: 'Not file uploaded' });

    let images = [];

    req.files.forEach((image) => {
      let uploadedImage = imageUtl.uploadImage(image);
      images.push(uploadedImage);
    });

    const newUploadedFile = new fileModel({
      filename: images,
      description,
      url: undefined,
    });

    await newUploadedFile.save();

    res.json({ newUploadedFile });
  },

  async remove(req, res) {
    const file = await fileModel.findById(req.params.id);
    if (!file) return res.status(400).send({ message: 'File not found' });

    file.filename.forEach((image) => {
      imageUtl.deleteImage(image);
    });

    res.send();
  },

  async findAll(req, res) {
    const uploads = await fileModel.find();
    res.json(uploads);
  },
};
