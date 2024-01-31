const Food = require("../models/foods.model");
const cloudinary = require("../controllers/cloudinary.config")


const addFood = async (req, res) => {
  const {
    foodId,
    foodName,
    foodDescription,
    foodPrice,
    portionSize,
    foodOffers,
  } = req.body;

  try {
    // Assuming you are using a middleware like multer for file uploads
    const foodImage = req.file ? req.file.path : '';

    if (!foodImage) {
      
      return res.status(400).json({ error: "foodImage is required." });
      
      
    }

    // Upload the image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(foodImage, {
      folder: 'food image', // optional: specify a folder in your Cloudinary account
    });

    // Use the secure URL from Cloudinary
    const cloudinarySecureUrl = cloudinaryResponse.secure_url;

    // Create a new Food instance
    const newFood = new Food({
      foodId,
      foodName,
      foodDescription,
      foodPrice,
      foodImage: cloudinarySecureUrl,
      portionSize,
      foodOffers,
    });

    // Save the Food instance to the database
    const savedFood = await newFood.save();

    res.status(201).json({
      message: "Food added successfully",
      food: savedFood,
    });
  } catch (error) {
    console.error(error);

    // Handle specific MongoDB validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ error: validationErrors });
    } else {
      res.status(500).json({ error: "Failed to add food item." });
    }
  }
};

const getFood = async (req, res) => {
  const FoodId = req.params.id;

  try {
    const food = await Food.findById(FoodId);

    if (!food) {
      return res.status(404).json("Food not found");
    }

    res.json(food);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateFood = async (req, res) => {
    const FoodId = req.params.id;
  
    try {
      // Correct the model name from Foods to Food
      const food = await Food.findById(FoodId);
  
      if (!food) {
        return res.status(404).json({ error: "Food not found" }); // Return JSON object instead of string
      }
  
      const {
        foodId,
        foodName,
        foodDescription,
        foodPrice,
        portionSize,
        foodOffers,
      } = req.body;
  
      // Check if foodImage is present in the request
      const updatedFields = {
        foodId,
        foodName,
        foodDescription,
        foodPrice,
        portionSize,
        foodOffers,
      };
  
      if (req.file) {
        // Assuming you are using a middleware like multer for file uploads
        const foodImage = req.file.path;
  
        // Upload the new image to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(foodImage, {
          folder: 'food images', // optional: specify a folder in your Cloudinary account
        });
  
        // Update the foodImage field with the Cloudinary URL
        updatedFields.foodImage = cloudinaryResponse.secure_url;
      }
  
      // Use findByIdAndUpdate to update the document
      const updatedFood = await Food.findByIdAndUpdate(
        FoodId,
        updatedFields,
        { new: true }
      );
  
      res.status(200).json(updatedFood);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const deleteFood = async (req, res) => {
  const FoodId = req.params.id;

  try {
    const food = await Food.findById(FoodId);

    if (!food) {
      return res.status(404).json("Food not found");
    }

    const deleteFood = await Food.findByIdAndDelete(FoodId);
    res.status(200).json(deleteFood);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  addFood,
  getFood,
  getFoods,
  updateFood,
  deleteFood,
};
