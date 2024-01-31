// // foodRoutes.js
// const express = require("express");
// const router = express.Router();
// const foodController = require("../controllers/food.controllers");
// const multer = require("multer");

// // Assuming you have a storage configuration for multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Route for adding food

// router.post("/add-food", upload.single("foodImage"), foodController.addFood);

// router.get("/", foodController.getFoods);
// router.get("/:id", foodController.getFood);
// router.put("/:id", foodController.updateFood);
// router.delete("/:id", foodController.deleteFood);  

// module.exports = router;  
const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controllers");
const upload = require("../controllers/multer.config");

router.post("/add-food", upload.single("foodImage"), foodController.addFood);
router.get("/", foodController.getFoods);
router.get("/:id", foodController.getFood);
router.put("/:id", upload.single("foodImage"), foodController.updateFood);
router.delete("/:id", foodController.deleteFood);

module.exports = router;  
