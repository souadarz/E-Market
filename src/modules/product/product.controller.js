import Product from "./product.model.js";

/**
 * @swagger
 * tags:
 *   name: Produits
 *   description: Gestion des produits
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Créer un nouveau produit
 *     requestBody:
 *       required: true
 *       description: Données du produit à créer
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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


/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Récupérer un produit par son id
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: id du produit
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produit trouvé
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */
export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);

    if (!product) {
      const err = new Error("produit non trouvé");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/products/{productId}:
 *   put:
 *     summary: Mettre à jour un produit par ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID du produit à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Données du produit à mettre à jour
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */
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

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Supprimer un produit par ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID du produit à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */
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
