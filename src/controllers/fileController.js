const fileModel = require('../models/file');
const fileController = {};

fileController.create = async (req, res) => {
  const { description } = req.body;

  if (!req.files || !description)
    return res.status(400).send({ message: 'Not file uploaded' });

  let images = [];

  req.files.forEach((image) => {
    let uploadedImage = image.location;
    images.push(uploadedImage);
  });

  const newUploadedFile = new fileModel({
    filename: images,
    description,
  });

  await newUploadedFile.save();

  return res.json(newUploadedFile);
};

fileController.remove = async (req, res) => {
  await fileModel
    .findByIdAndRemove(req.params.id)
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.status(400).send({ message: 'Cannot delete' });
    });
};
fileController.findAll = async (req, res) => {
  const uploads = await fileModel.find();
  res.json({ uploads });
};

module.exports = fileController;
