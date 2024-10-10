const Product = require("../models/products");
const Cart = require("../models/cart");
const uploadImage = require('../middlewares/uploadImage');

// List
exports.products = async (req, res, next) => {
  try {
    const productList = await Product.find();
    res.status(200).json(productList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET PRODUCT
exports.product = async (req, res, next) => {
  try {
    const productList = await Product.findById(req.params.id);
    res.status(200).json(productList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create
exports.createProduct = async (req, res) => {
  try {
    const { productImage } = req.files;

    uploadImage('ProductImages', productImage)(req, res, async () => {
      const { uploadedImage } = req;

      const newProduct = new Product({
        ...req.body,
        productImage: uploadedImage
      });

      await newProduct.save();

      res.status(201).json(newProduct);
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  if (req.files) {
    const { productImage } = req.files
    uploadImage('ProductImages', productImage)(req, res, async () => {
      const { uploadedImage } = req;

      await Product.findByIdAndUpdate(req.params.id, {
        ...req.body,
        productImage: uploadedImage
      }, { new: true })

        .then(data => {
          res.json({ status: 200, success: true, message: "Product update successfully...", data })
        }).catch(err => {
          res.json(err || { staus: 500, success: false, message: 'Something went wrong!' })
        })
    });
  } else {
    await Product.findByIdAndUpdate(req.params.id, {
      ...req.body
    }, { new: true })

      .then(data => {
        res.json({ status: 200, success: true, message: "Product update successfully...", data })
      }).catch(err => {
        res.json(err || { staus: 500, success: false, message: 'Something went wrong!' })
      })
  }
}

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await Product.findByIdAndDelete(req.params.id)
    await Cart.updateMany({ 'items.product': req.params.id }, { $pull: { items: { product: productId } } })

    if (product) {
      res.json({ status: 200, success: true, message: 'Deleted successfully...' })
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
  catch (err) {
    res.json(err || { staus: 500, success: false, message: 'Something went wrong!' })
  }
}