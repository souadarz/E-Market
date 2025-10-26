import Category from "./category.model.js";

/**
 * @swagger
 * tags:
 *   name: categories
 *   description: Gestion des categories
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Créer une nouvelle categorie
 *     requestBody:
 *       required: true
 *       description: Données de la categorie à créer
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       409:
 *         description: Categorie déjà existante
 *       201:
 *         description: Categorie créé avec succès
 *       500:
 *         description: Erreur serveur
 **/
export const createCategory = async (req, res, next) => {
  try {
    const { name, description, products } = req.body;
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      const err = new Error("Categorie déjà existante");
      err.statusCode = 409;
      throw err;
    }

    const newCategory = new Category({
      name,
      description,
      products: products || [],
    });
    const category = await newCategory.save();
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Récupérer tous les categories
 *     responses:
 *       200:
 *         description: Liste des categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Aucune categorie trouvée
 *       500:
 *         description: Erreur serveur
 */
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      const err = new Error("aucune categorie trouvée");
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json(categories);
  } catch (err) {
    next(err)
  }
};

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   get:
 *     summary: Récupérer une categorie par son id
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: id du categorie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categorie trouvée
 *       404:
 *         description: Categorie non trouvé
 *       500:
 *         description: Erreur serveur
 */
export const getCategoryById = async (req, res, next) => {
  try {
    const id = req.params.categoryId;
    // return res.json({ data: id });
    const category = await Category.findById(id);

    if (!category) {
      const err = new Error("categorie non trouvé");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(err);
  }
};

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   put:
 *     summary: Mettre à jour un categorie par ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID du categorie à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Données du categorie à mettre à jour
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: categorie mis à jour avec succès
 *       404:
 *         description: categorie non trouvée
 *       500:
 *         description: Erreur serveur
 */
export const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.categoryId;
    const updatedData = req.body;
    const categoryUpdated = await Category.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!categoryUpdated) {
      const err = new Error("categorie non trouvée");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "categorie mis à jour avec succés",
      data: categoryUpdated,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   delete:
 *     summary: Supprimer un categorie par ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID du categorie à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: categorie supprimé avec succès
 *       404:
 *         description: categorie non trouvée
 *       500:
 *         description: Erreur serveur
 */
export const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.categoryId;
    const categoryDeleted = await Category.findByIdAndDelete(id);

    if (!categoryDeleted) {
      const err = new Error("categorie non trouvée");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "categorie supprimer avec succés",
    });
  } catch (err) {
   next(err);
  }
};
