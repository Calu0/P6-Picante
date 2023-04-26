const multer = require('multer');
const { throwError } = require('rxjs');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const validExtension = ['jpg', 'png']


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype];
        const extensionCheck = validExtension.find(ext => ext == extension)
        if (extensionCheck) {
            console.log(extensionCheck)
            callback(null, Date.now() + '.' + extension);
        }
        else{
            return callback(new Error('Invalid format'))
        }
    }
});



module.exports = multer({ storage: storage }).single('image');