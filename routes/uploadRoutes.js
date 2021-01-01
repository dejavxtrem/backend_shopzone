import path from 'path'
import express from 'express';
import multer from 'multer';



const uploadRouter = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req , file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/
    const extenstionType = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if (extenstionType && mimetype) {
        return cb(null, true)
    } else {
        cb('Image files only')
    }
}


const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})

uploadRouter.post('/', upload.single('image'), (req, res) => {
    
    res.send(`/${req.file.path}`)
})


export default uploadRouter