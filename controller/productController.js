const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const cloudinary = require("../utils/cloudinary");

//@desc     Get all Products
//@route    POST /api/products/
//access    Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

//@desc     Get single Product details
//@route    POST /api/products/
//access    Public
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json(product);
});

//@desc     Set Product
//@route    POST /api/products/
//access    Private
const setProduct = asyncHandler(async (req, res) => {
  // Upload image to cloudinary
  const result = await cloudinary.uploader.upload(req.file.path);

  const product = await Product.create({
    user: req.user.id,
    name: req.body.name,
    generic_name: req.body.generic_name,
    image: result.secure_url,
    cloudinary_id: result.public_id,
    brand: req.body.brand,
    dosage_form: req.body.dosage_form,
    description: req.body.description,
    dose: req.body.dose,
    unit_price: req.body.unit_price,
  });

  res.status(200).json(product);
});

//@desc     update Product
//@route    PUT /api/products/:id
//access    Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }


    // Delete image from cloudinary
    await cloudinary.uploader.destroy(product.cloudinary_id);
  

  // Upload new image to cloudinary
  const result = await cloudinary.uploader.upload(req.file.path);
  const data = {
    name: req.body.name || product.name,
    generic_name: req.body.generic_name || product.generic_name,
    image: result.secure_url || product.image,
    cloudinary_id: result.public_id || product.cloudinary_id,
    brand: req.body.brand || product.brand,
    dosage_form: req.body.dosage_form || product.dosage_form,
    description: req.body.description || product.description,
    dose: req.body.dose || product.dose,
    unit_price: req.body.unit_price || product.unit_price,
  };

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });

  res.status(200).json(updatedProduct);
});

//@desc     Delete Products
//@route    DELETE /api/products/id
//access    Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // Delete image from cloudinary
  await cloudinary.uploader.destroy(product.cloudinary_id);

  if (!product) {
    res.status(400);
    throw new Error("Product not Found");
  }

  await product.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAllProducts,
  getSingleProduct,
  setProduct,
  updateProduct,
  deleteProduct,
};
