/*
  Author: Idarcio Oliveira 05/04/2020
  Contem funcoes para trabalhar com imagens:
  - updateImage: excluir a imagem antiga e adiciona uma nova
        recebe a o nome da imagem antiga, e a nova imagem (req.file)

  - uploadImage: adiciona uma imagem ao diretorio do servidor
        recebe a uma imagem (req.file) e retorna o nome da imagem no diretorio onde foi salva

  - deleteImage: exclui uma imagem no diretorio
        recebe a o nome da imagem e excluir no diretorio

*/

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
      path.resolve(__dirname, '..', '..', 'upload/' + imageName),
      (err) => {
        if (err) return err;
      }
    );
  }
}

module.exports = { uploadImage, deleteImage, updateImage };
