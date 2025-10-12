import { body, validationResult, param} from "express-validator";

//validation des champs lors de la creation d'un utilisateur
export const validateCreateUser = [
    body("fullname")
        .notEmpty().withMessage("le nom est obligatoire")
        .isLength({ min: 3 }).withMessage("le nom doit contenir au moins 3 caraxtères"),

    body("email")
        .notEmpty().withMessage("l'email est obligatoire")
        .isEmail().withMessage("Adresse email invalide"),

    body("password")
        .notEmpty().withMessage("Le mot de passe est obligatoire")
        .isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères"),

    body("role")
            .optional()
            .isIn(["admin", "user"]).withMessage("Role invalide"),

        //vérification des erreurs
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

//validation des champs lors de la mise à jour d'un ustilisateur
export const validateUpdateUser = [
    //on verifier que l'id passé dans l'url est un objectId
    param("userId")
        .isMongoId().withMessage("Identifiant utilisateur invalide"),

    //tous les chapms sont optionnels mais doivent respecter les régles s'ils sant présents 
    body("fullname")
        .optional()
        .isLength({ min: 3 }).withMessage("Le nom complet doit contenir au moins 3 caractères"),

    body("email")
        .optional()
        .isEmail().withMessage("Adresse email invalide"),

    body("password")
        .optional()
        .isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères"),

    body("role")
        .optional()
        .isIn(["admin", "user"]).withMessage("Role invalide"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]


//validation des champs lors de la création du produit
export const validateCreateProduct = [
    body("title")
        .notEmpty().withMessage("le titre du produit est obligatoire")
        .isLength({ min: 3 }).withMessage("le titre doit contenir au moins 3 caractères"),

    body("description")
        .notEmpty().withMessage("la description est obligatoire")
        .isLength({ min: 10 }).withMessage("la description doit contenir au moins 10 caractères"),

    body("price")
        .notEmpty().withMessage("le prix est obligatoire")
        .isFloat({ gt: 0 }).withMessage("le prix doit être un nombre positif"),

    body("stock")
        .notEmpty().withMessage("le stock est obligatoire")
        .isInt({ min: 0 }).withMessage("le stock doit être un entier positif"),

    body("categories")
        .isArray({ min: 1 }).withMessage("les catégories doivent être un tableau contenant au moins une valeur"),

    body("imageUrl")
        .optional()
        .isString().withMessage("l'url de l'image doit être une chaîne de caractères"),

    // Vérification finale des erreurs
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


//validation des champs lors de la mise à jour d'un produit
export const validateUpdateProduct = [
  //Vérifier que l'ID du produit (dans l'URL) est valide
    param("productId")
        .isMongoId().withMessage("ID du produit invalide"),

  //les champs à mettre à jour sont facultatifs, mais s’ils existent, ils doivent être valides

    body("title")
        .optional()
        .isString().withMessage("Le titre doit être une chaîne de caractères")
        .isLength({ min: 3 }).withMessage("Le titre doit contenir au moins 3 caractères"),

    body("description")
        .optional()
        .isString().withMessage("La description doit être une chaîne de caractères")
        .isLength({ min: 10 }).withMessage("La description doit contenir au moins 10 caractères"),

    body("price")
        .optional()
        .isFloat({ gt: 0 }).withMessage("Le prix doit être un nombre positif"),

    body("stock")
        .optional()
        .isInt({ min: 0 }).withMessage("Le stock doit être un entier positif"),

    body("categories")
        .optional()
        .isArray().withMessage("Les catégories doivent être un tableau"),

    body("imageUrl")
        .optional()
        .isURL().withMessage("L'URL de l'image n'est pas valide"),

    //Gestion centralisée des erreurs
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Erreur de validation",
            errors: errors.array(),
        });
        }
        next();
    },
];


//validation des champs lors de la creation d'une categorie
export const validateCreateCategory = [
    body("name")
        .notEmpty().withMessage("Le nom de la catégorie est obligatoire")
        .isLength({ min: 3 }).withMessage("Le nom doit contenir au moins 3 caractères"),

    body("description")
        .optional()
        .isString().withMessage("La description doit être une chaîne de caractères"),

    body("products")
        .optional()
        .isArray().withMessage("Products doit être un tableau"),

    // Gestion centralisée des erreurs
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Erreur de validation",
            errors: errors.array(),
        });
        }
        next();
    }
];


//validation des champs lors de la mise à jour d'une categorie
export const validateUpdateCategory = [
  // Vérifie que l'ID de la catégorie passé dans l'URL
  param("categoryId")
    .isMongoId()
    .withMessage("ID de catégorie invalide"),

  // Les champs sont facultatifs, mais doivent être valides si présents
  body("name")
    .optional()
    .isString().withMessage("Le nom doit être une chaîne de caractères")
    .isLength({ min: 3 }).withMessage("Le nom doit contenir au moins 3 caractères"),

  body("description")
    .optional()
    .isString().withMessage("La description doit être une chaîne de caractères"),

  body("products")
    .optional()
    .isArray().withMessage("Products doit être un tableau"),

  // Gestion centralisée des erreurs
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Erreur de validation",
        errors: errors.array(),
      });
    }
    next();
  }
];