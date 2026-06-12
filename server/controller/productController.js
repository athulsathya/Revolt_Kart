const Product = require("../Model/productModel");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");

exports.addProduct = async (req, res) => {
  try {
    const { productName, productDesc, productPrice, category, brand } =
      req.body;
    const userId = req.userId;

    if (!productName || !productDesc || !productPrice || !category || !brand) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }

    //Handle Multiple image uploads
    let productImg = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileUri = getDataUri(file);

        const result = await cloudinary.uploader.upload(fileUri, {
          folder: "products", //cloudinary name
        });

        productImg.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    //create a product in db
    const newProduct = await Product.create({
      userId,
      productName,
      productDesc,
      productPrice,
      category,
      brand,
      productImg, //arry of object [{url:ublic_id},{url,pblic_id}]
    });

    return res.status(201).json({
      success: true,
      message: "Product added succesfully",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No product Found", products: [] });
    }

    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    //Delete images from cloudinary
    if (product.productImg && product.productImg.length > 0) {
      for (let img of product.productImg) {
        const result = await cloudinary.uploader.destroy(img.public_id);
      }
    }

    //delete product from mongoDb
    await Product.findByIdAndDelete(productId);
    return res
      .status(200)
      .json({ success: true, message: "Product deleted succesfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      productName,
      productDesc,
      productPrice,
      category,
      brand,
      existingImages,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not Found" });
    }

    let updatedImages = [];

    // keep selected old images
    if (existingImages) {
      const keepIds = JSON.parse(existingImages);

      updatedImages = product.productImg.filter((img) =>
        keepIds.includes(img.public_id),
      );

      // delete only removed images
      const removedImages = product.productImg.filter(
        (img) => !keepIds.includes(img.public_id),
      );

      for (let img of removedImages) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    } else {
      updatedImages = product.productImg; // keep all if nothing sent
    }

    // upload new images if any
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        if (!file) continue;

        const fileUri = getDataUri(file);

        if (!fileUri) continue;

        const result = await cloudinary.uploader.upload(fileUri, {
          folder: "products",
        });

        updatedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    // update product
    product.productName = productName || product.productName;
    product.productDesc = productDesc || product.productDesc;
    product.productPrice = productPrice || product.productPrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.productImg = updatedImages;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
