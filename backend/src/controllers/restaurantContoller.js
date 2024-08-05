import Restaurant from "../models/restaurantModel.js";

//Create a new restaurant
export const createRestaurant = async (req, res) => {
    const { name, address, phone } = req.body;
  
    try {
      const newRestaurant = new Restaurant({ name, address, phone });
  
      const restaurant = await newRestaurant.save();
      res.json(restaurant);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
//Get all restaurants
export const getRestaurants = async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      res.json(restaurants);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  };

  
// Get a restaurant by ID
export const getRestaurantById = async (req, res) => {
  try {
      const restaurant = await Restaurant.findById(req.params.id);
      if (!restaurant) {
          return res.status(404).json({ msg: 'Restaurant not found' });
      }
      res.json(restaurant);
  } catch (err) {
      res.status(500).send('Server error');
  }
};

// Update a restaurant
export const updateRestaurant = async (req, res) => {
  const { name, address, phone } = req.body;

  try {
      let restaurant = await Restaurant.findById(req.params.id);
      if (!restaurant) {
          return res.status(404).json({ msg: 'Restaurant not found' });
      }

      restaurant = await Restaurant.findByIdAndUpdate(
          req.params.id,
          { $set: { name, address, phone } },
          { new: true }
      );

      res.json(restaurant);
  } catch (err) {
      res.status(500).send('Server error');
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req, res) => {
  try {
      let restaurant = await Restaurant.findById(req.params.id);
      if (!restaurant) {
          return res.status(404).json({ msg: 'Restaurant not found' });
      }

      await Restaurant.findByIdAndRemove(req.params.id);
      res.json({ msg: 'Restaurant removed' });
  } catch (err) {
      res.status(500).send('Server error');
  }
};
  