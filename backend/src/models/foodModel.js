import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true, 
    },
    price: { 
        type: Number, 
        required: true ,
    },
    category: { 
        type: String, 
        required: true ,
    },
    restaurant: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant', required: true 
    },
});

const Food = mongoose.model('Food', FoodSchema);

export default Food;