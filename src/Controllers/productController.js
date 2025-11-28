import Product from "../Models/product.js";

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    next(error);
  }
};

async function getProductById(req, res, next) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function getProductByCategory(req, res, next) {
  try {
    const category = req.params.category;
    const products = await Product
      .find({ category })
      .sort({ name: 1 });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found on this category' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function createProduct(req, res, next) {
  try {
    const { title, description, price, imagesUrl, category, stock } = req.body;

    if (!title || !description || !price || !imagesUrl || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newProduct = await Product.create({ title, description, price, imagesUrl, category, stock });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const id = req.params.id;
    const { title, description, price, imagesUrl, category, stock } = req.body;

    if (!title || !description || !price || !imagesUrl || !category || !stock) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id,
      { title, description, price, imagesUrl, category, stock },
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}



export{getProducts, getProductById, getProductByCategory, createProduct, updateProduct, deleteProduct};


