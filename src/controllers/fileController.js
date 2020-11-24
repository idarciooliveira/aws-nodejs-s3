const fileModel = require('../models/file');
const aws = require('aws-sdk');
const imageUtil = require('../helpers/imageUtil');

const fileController = {};
const s3 = new aws.S3();

fileController.create = async (req, res) => {
  const { description } = req.body;

  if (!req.files || !description)
    return res.status(400).send({ message: 'Not file uploaded' });

  let filenames = [];
  let urls = [];

  req.files.forEach((image) => {
    let url = image.location;
    let filename = image.key;

    urls.push(url);
    filenames.push(filename);
  });

  const newUploadedFile = new fileModel({
    filenames,
    urls,
    description,
  });

  await newUploadedFile.save();

  return res.json(newUploadedFile);
};

fileController.remove = async (req, res) => {
  const file = await fileModel.findById(req.params.id);

  if (!file) return res.status(404).send({ message: 'Not Found' });

  await fileModel.findByIdAndRemove(req.params.id);

  file.filenames.forEach((key) => {
    if (process.env.STORAGE_TYPE === 's3') {
      s3.deleteObject(
        {
          Bucket: process.env.BUCKET_NAME,
          Key: key,
        },
        function (err, data) {
          if (err)
            return res
              .status(400)
              .send({ message: 'Cannot remove the file in s3' });
        }
      );
    } else imageUtil.deleteImage(key);
  });

  res.send();
};
fileController.findAll = async (req, res) => {
  const uploads = await fileModel.find();
  res.json({ uploads });
};

module.exports = fileController;
