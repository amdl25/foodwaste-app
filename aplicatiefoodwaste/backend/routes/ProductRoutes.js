import express from 'express';
import { createProduct, getProduct, getProductId, updateProduct, deleteProduct } from '../dataAccess/ProductDa.js';
import Product from '../entities/Product.js';
import User from '../entities/User.js';

let productRouter = express.Router();

productRouter.route('/product').post(async (req, res) => {
    res.status(201).json(await createProduct(req.body));
})

productRouter.route('/product').get(async (req, res) => {
    res.status(200).json(await getProduct());
})

productRouter.route('/product/:id').get(async (req, res) => {
    res.status(200).json(await getProductId(req.params.id));
})

productRouter.route('/product/:id').put(async (req,res ) => {
    let ret = await updateProduct(req.params.id, req.body);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})

productRouter.route('/product/:id').delete(async (req,res ) => {
    let ret = await deleteProduct(req.params.id);

    if(ret.error)
        res.status(400).json(ret.msg);
    else
        res.status(200).json(ret.obj);

})

productRouter.route('/add-product').post(async (req, res) => {
    const { ProductName, ProductCategory, ProductExpirationDate, ProductIsAvailable, ProductQuantity, UserId } = req.body;
  
    try {
      const user = await User.findByPk(UserId);
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      const product = await createProduct({
        ProductName,
        ProductCategory,
        ProductExpirationDate,
        ProductIsAvailable,
        ProductQuantity,
        UserId,
      });
  
      res.status(201).json(product);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

export default productRouter;

