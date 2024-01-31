const mongoose = require('mongoose');
const { Schema } = mongoose;
const cloudinary = require("../controllers/cloudinary.config");

const foodSchema = new Schema({
  foodId: {
    type: String,
    required: true,
    unique: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  foodDescription: {
    type: String,
    required: true,
  },
  foodPrice: {
    type: String,
    required: true,
  },
  foodImage: {
    type: String,
    required: true,
  },
  portionSize: {
    type: String,
    required: true,
  },
  foodOffers: {
    type: String,
    required: false,
  },
});

foodSchema.pre("save", async function (next) {
  if (this.isModified("foodImage")) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(this.foodImage, {
        folder: 'foods', // optional: specify a folder in your Cloudinary account
      });

      // Update the foodImage field with the Cloudinary URL
      this.foodImage = cloudinaryResponse.secure_url;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model('Food', foodSchema);
