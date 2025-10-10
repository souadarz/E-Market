import Product from "./product.model.js";

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Créer un nouveau produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       500:
 *         description: Erreur serveur
 **/


export const createProduct = async (req, res, next) => {
  try {
    const { title, description, price, stock, categories, imageUrl } = req.body;

    const newProduct = new Product({
      title,
      description,
      price,
      stock,
      categories,
      imageUrl,
    });
    const product = await newProduct.save();
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Récupérer tous les produits
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   stock:
 *                     type: number
 *                   categories:
 *                     type: array
 *                     items:
 *                       type: string
 *                   imageUrl:
 *                     type: string
 *       404:
 *         description: Aucun produit trouvé
 *       500:
 *         description: Erreur serveur
 */

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      const err = new Error("Aucun produit trouvé");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);

    if (!product) {
      const err = new Error("Aucun produit trouvé");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const updatedData = req.body;
    const productUpdated = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!productUpdated) {
      const err = new Error("produit non trouvé");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "produit mis à jour avec succés",
      data: productUpdated,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const productDeleted = await Product.findByIdAndDelete(id);

    if (!productDeleted) {
      const err = new Error("produit non trouvé");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "produit supprimer avec succés",
    });
  } catch (err) {
    next(err);
  }
};
