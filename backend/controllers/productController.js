const Product = require('../models/Product');



//GET operation
const getProducts = async(req,res,next)=>{
    try{
        const {search , category}= req.query;
        const filter ={};

        if (search){
            filter.name = {$regex : search , $options: 'i'};
        }
        if(category){
            filter.category = category;
        }

        const products = await Product.find(filter).sort({createdAt: -1});
        res.json(products);

    }catch(err){

        next(err);
    }
};


//POST operation
const createProduct = async(req,res,next)=>{
    try{
        const product = await Product.create(req.body);
        res.status(201).json(Product);
    }catch(err){
            next(err);
    }

};


//PUT operation
const updateProduct=async(req,res,next)=>{
    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,

            {new : true , runValidators : true}

        );

        if(!product){
            return res.status(404).json({message : " Product Not Found "});
        }
        res.json(product);
    

    }catch(err){

        next(err);
    }
};



//DELETE operation
const deleteProduct= async(req,res,next)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);

        if(!product){
            return res.status(404).json({message: 'Product Not Found'});
        }
        res.json({message : "Item deleted Successfully! "});

    }catch(err){
        next(err);

    }
};


//GET low stock products 
const getLowStockProducts = async(req,res,next)=>{
    try{
    const products = await Product.find({
        $expr :{$lte : ['$quantity', '$minStock'] }
    });

    res.json(products);
    
    }catch(err){

        next(err);
    }
};


module.exports= {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
};