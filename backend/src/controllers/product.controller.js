import * as productModel from '../models/product.model.js';
import imagekit from "../config/imagekit.js";
export const getProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const createProduct = async (req, res) => {
  try {

    let imageUrls = [];

    if (req.files && req.files.length > 0) {

      for (const file of req.files) {

        const uploaded = await imagekit.upload({
          file: file.buffer,
          fileName: Date.now() + "-" + file.originalname,
          folder: "products"
        });

        imageUrls.push(uploaded.url);
      }
    }

    const productData = {
      ...req.body,
      image_url_1: imageUrls[0] || null,
      image_url_2: imageUrls[1] || null,
      image_url_3: imageUrls[2] || null,
      image_url_4: imageUrls[3] || null,
    };

    if (req.body.highlights) {
      productData.highlights = JSON.parse(req.body.highlights);
    }

    const product = await productModel.createProduct(productData);

    res.status(201).json(product);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {

    let imageUrls = [];

    if (req.files && req.files.length > 0) {

      for (const file of req.files) {

        const uploaded = await imagekit.upload({
          file: file.buffer,
          fileName: Date.now() + "-" + file.originalname,
          folder: "products"
        });

        imageUrls.push(uploaded.url);
      }
    }

    const productData = {
      ...req.body,
      image_url_1: imageUrls[0] || req.body.image_url_1,
      image_url_2: imageUrls[1] || req.body.image_url_2,
      image_url_3: imageUrls[2] || req.body.image_url_3,
      image_url_4: imageUrls[3] || req.body.image_url_4,
    };

    if (req.body.highlights) {
      productData.highlights = JSON.parse(req.body.highlights);
    }

    const product = await productModel.updateProduct(req.params.id, productData);

    res.json(product);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productModel.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};