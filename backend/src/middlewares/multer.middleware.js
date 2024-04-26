import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file)
    cb(null, "./public/temp")
    console.log("hello consloleldjflkajds")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage: storage })