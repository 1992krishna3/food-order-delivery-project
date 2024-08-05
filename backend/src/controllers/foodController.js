import Food from "../models/foodModel.js";

//Create a new food item
export const createFoodItem = async (req, res) => {
    const { name, description, price, category,restaurant } = req.body;
    try {
        const newFoodItem = new Food({ name,description,price,category,restauran });
        const foodItem = await newFoodItem.save();
        res.json(foodItem);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

//Get all food items
export const getFoodItems = async (req, res) =>{
    try {
        const foodItems = await Food.find();
        res.json(foodItems);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Get a food item by ID
export const getFoodItemById = async (req, res) => {
    try {
        const foodItem = await Food.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ msg: 'Food item not found' });
        }
        res.json(foodItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update a food item
export const updateFoodItem = async (req, res) => {
    const { name, description, price, category } = req.body;

    try {
        let foodItem = await Food.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ msg: 'Food item not found' });
        }

        foodItem = await Food.findByIdAndUpdate(
            req.params.id,
            { $set: { name, description, price, category } },
            { new: true }
        );

        res.json(foodItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a food item
export const deleteFoodItem = async (req, res) => {
    try {
        let foodItem = await Food.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ msg: 'Food item not found' });
        }

        await Food.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Food item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
