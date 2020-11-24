const fs = require('fs');
const path = require('path');

function updateImage(nomeDaimagemAntiga, novaImagem) {
  deleteImage(nomeDaimagemAntiga);
  return updateImage(novaImagem);
}

function uploadImage(file) {
  if (!file) {
    return undefined;
  } else {
    const nomeDaImagem = Date.now();
    const pastaTemporariaDaImagem = file.path;
    const extensaoDaImagem = path.extname(file.originalname).toLowerCase();
    const destinoDaImagem = path.resolve(
      __dirname,
      '..',
      '..',
      `upload/${nomeDaImagem}${extensaoDaImagem}`
    );
    if (
      extensaoDaImagem === '.png' ||
      extensaoDaImagem === '.jpg' ||
      extensaoDaImagem === '.jpeg'
    ) {
      fs.renameSync(pastaTemporariaDaImagem, destinoDaImagem);
      return nomeDaImagem + extensaoDaImagem;
    } else {
      fs.unlinkSync(pastaTemporariaDaImagem);
      return { error: 'Apenas e permitido imagens' };
    }
  }
}

function deleteImage(imageName) {
  if (imageName) {
    fs.unlink(
      path.resolve(__dirname, '..', '..', 'tmp', 'uploads/' + imageName),
      (err) => {
        if (err) return err;
      }
    );
  }
}

module.exports = { uploadImage, deleteImage, updateImage };
