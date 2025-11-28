import mongoose from 'mongoose';

const productSchema = mongoose.Schema ({
 title:{
    type: String,
    required: true,
    unique: true
 },

 description:{
    type: String,
    required: true,
 },

  price:{
    type: Number,
    required: true,
    min: 1,
 },

   category:{
    type: String,
    required: true,
    enum: ['anillo', 'collar', 'aretes'],
 },

   imagesUrl: [{
    type: String,
    trim: true,
  }],

   stock:{
      type: Number,
      required: true,
      min: 0
   }
});

const Product = mongoose.model('Product', productSchema);

export default Product;