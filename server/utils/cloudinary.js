// import { v2 as cloudinary } from "cloudinary";
// import "dotenv/config";

// // console.log("CLOUDINARY CONFIG:");
// // console.log(process.env.CLOUD_NAME);
// // console.log(process.env.API_KEY);
// // console.log("API SECRET:", process.env.API_SECRET);

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// export default cloudinary;

const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
