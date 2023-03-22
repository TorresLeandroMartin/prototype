const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(__dirname, "../public/images/users/");
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    let imageName = "img-avatar" + Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});

const uploadFile = multer({ storage });

module.exports = uploadFile;
