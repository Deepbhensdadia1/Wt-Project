const Cart = require("../models/cart");

// addToCart
exports.addToCart = async (req, res, next) => {
  try {
    const checkCart = await Cart.findOne({user_id: req.body.user_id})

    if (checkCart){
        const productIndex = checkCart.items.findIndex(item => item.product.toString() === req.body.product);

        if (productIndex !== -1) {
            checkCart.items[productIndex].quantity += 1;
            await checkCart.save()
            res.status(201).json(checkCart);
        }else{
            const cart = await Cart.findOneAndUpdate({_id: checkCart._id}, {
                    $push: {
                         items: { product: req.body.product}
                        }
                }, {new: true});
            res.status(201).json(cart);
        }
    }else{
        const cart = await Cart.create(req.body);
        res.status(201).json(cart);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// removeFromCart
exports.removeFromCart = async (req, res) => {
    try{
        const currentCart = await Cart.findOne({user_id: req.body.user_id})

        if (currentCart){
            const productIndex = currentCart.items.findIndex(item => item.product.toString() === req.body.product);

            if (productIndex !== -1) {
                if (currentCart.items[productIndex].quantity > 1) {
                    currentCart.items[productIndex].quantity = currentCart.items[productIndex].quantity - 1
                }else{
                    currentCart.items[productIndex].quantity += 1;
                    currentCart.items.splice(productIndex, 1)
                }
                await currentCart.save()
                res.status(201).json({success: true, currentCart});
                
            }else{
                res.json({ success: false, message: 'Product is not in the cart' });
            }
        }else{
            res.json({ success: false, message: 'Cart not found' });
        }
    }catch(error){
        res.status(400).json({ success: false, message: error.message });
    }
}


// User Cart
exports.userCart = async (req, res, next) => {
    try{
        const cart = await Cart.find({user_id: req.params.id}).populate('items.product')
        res.status(200).json(cart);
    } catch (error){
    res.status(400).json({ message: error.message });
    }
}