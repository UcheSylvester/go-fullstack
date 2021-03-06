const multer = require('multer')

const MIMETYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    console.log(file)
    const name = file.originalname.split(' ').join('_')
    const extension = MIMETYPES[file.mimetype]

    callback(null, name + Date.now() + '.' + extension)
  }

})

module.exports = multer({ storage: storage }).single('image')