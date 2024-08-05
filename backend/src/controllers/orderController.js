import Order from "../models/orderModel.js";


//Create a new order
exports.createOrder = async (req, res) => {
    const { restaurant, items, total } = req.body;
    try {
        const newOrder = new Order({
            user: req.user.id,
            restaurant,
            items,
            total,
       });

       const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

//Get all orders
exports.getOrders= async (req, res) => {
    try {
        const orders =await Order.find({ user: req.user.id }).populate('items.food');
        res.json(orders);  
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }

};

//Get an order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
    }
       res.json(order);
    } catch (err) {
       console.error(err.message);
       res.status(500).send('Server error');
    }
};