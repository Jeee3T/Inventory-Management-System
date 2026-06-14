const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name :{
            type : String,
            required :  [true, 'Product name is required'],
            trim : true,
        },
        
        category : {
            type : String,
            required : [true, 'Category is required'],
            trim : true,
        },

        price : {
            type : Number, 
            required : [true, "price is required"],
            min : [0, 'price cannot be negative'],
        },

        quantity: {
            type : Number,
            required : [true, "quantity is required "],
            min :[0, 'quantity cannot be negative'],
        },

        minStock : {
            type : Number,
            required : [true, "Min stock is required "],
            min :[0, ' Min stock cannot be negative'],
        },

    },

    {
        timestamps : true, 
    }

);

module.exports = mongoose.model('Product', productSchema);
