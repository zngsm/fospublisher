const { Router } = require("express");
const router = Router();
const path = require("path");
const s3 = require('../../config/s3');
const multer = require("multer");
const multerS3 = require('multer-s3');

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'autobiography',
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension)
    },
    acl: 'public-read-write',
    contentType: multerS3.AUTO_CONTENT_TYPE
  })
});

router.post('/upload', upload.single("imgFile"), (req, res) => {
  res.status(200).json({imgUrl: req.file.location});
});

module.exports = router;