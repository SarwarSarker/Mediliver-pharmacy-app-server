const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please Enter Product Name"],
    },
    generic_name: {
      type: String,
      required: [true, "Please Enter Product Generic Name"],
    },
    image: {
      type: String,
      required: [true, "Please Enter Product image"],
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: [true, "Please Enter brand Name"],
    },
    dosage_form: {
      type: String,
      required: [true, "Please Enter Dosage Form"],
    },
    description: {
      type: String,
      required: [true, "Please Enter Product description"],
    },
    dose: {
      type: String,
      required: [true, "Please Enter Product dose"],
    },
    unit_price: {
      type: String,
      required: [true, "Please Enter Product price"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
