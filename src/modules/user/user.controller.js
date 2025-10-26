import User from "./user.model.js";

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un nouveau utilisateur
 *     requestBody:
 *       required: true
 *       description: Données de l'utilisateur à créer
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: utilisateur créé avec succès
 *       409:
 *         description: utilisateur déjà existant
 *       500:
 *         description: Erreur serveur
 **/
export const createUser = async (req, res, next) => {
  try {
    const { fullname, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const err = new Error("utilisateur déjà existant");
      err.statusCode = 409;
      throw err;
    }

    const newUser = new User({
      fullname,
      email,
      password,
      role: role || "user",
    });
    const user = await newUser.save();
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: Aucun utilisateur trouvé
 *       500:
 *         description: Erreur serveur
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      const err = new Error("aucun utilisateur trouvé");
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Récupérer un utilisateur par son id
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: id du utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: utilisateur trouvé
 *       404:
 *         description: utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.userId;
    // return res.json({ data: id });
    const user = await User.findById(id);

    if (!user) {
      const err = new Error("aucun utilisateur trouvé");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Mettre à jour un utilisateur par ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID du utilisateur à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Données du utilisateur à mettre à jour
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: utilisateur mis à jour avec succès
 *       404:
 *         description: utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const updatedData = req.body;
    const userUpdated = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!userUpdated) {
      const err = new Error("Utilisateur non trouvé");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "utilisateur mis à jour avec succés",
      data: userUpdated,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Supprimer un utilisateur par ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID du utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: utilisateur supprimé avec succès
 *       404:
 *         description: utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted) {
      const err = new Error("Utilisateur non trouvé");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "utilisateur supprimer avec succés",
    });
  } catch (err) {
    next(err);
  }
};
