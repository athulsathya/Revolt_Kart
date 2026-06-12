import multer from "multer";

const storage = multer.memoryStorage();

//singleUpload
export const singleUpload = multer({ storage }).single("profilePic");

//Multiple Upload upto 5 images
export const multipleUpload = multer({ storage }).array("files", 5);

// const multer = require("multer");

// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;
