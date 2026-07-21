import multer from "multer";

const storage = multer.memoryStorage();

//singleUpload
export const singleUpload = multer({ storage }).single("profilePic");

//Multiple Upload upto 5 images
export const multipleUpload = multer({ storage }).array("files", 5);
