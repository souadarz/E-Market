import Category from "./category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description, products } = req.body;
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      res.status(400).json({ message: "categorie déjà exist" });
    }

    const newCategory = new Category({
        name,
        description,
        products : products || []
    });
    const category = await newCategory.save();
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error(
      "Erreur lors de la création du categorie :",
      error.message
    );
    res
      .status(500)
      .json({
        message: "Impossible de créer la categorie",
        error: error.message,
      });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "aucun categorie trouvé" });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des categories :",
      error.message
    );
    res
      .status(500)
      .json({
        message: "Impossible de récupérer les categories",
        error: error.message,
      });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const id = req.params.categoryId;
    // return res.json({ data: id });
    const category = await category.findById(id);

    if (!category) {
      res.status(404).json({ message: "aucun categorie trouvé" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.categoryId;
    const updatedData = req.body;
    const categoryUpdated = await Category.findByIdAndUpdate(id, updatedData, { new: true });

    if (!categoryUpdated) {
      return res.status(404).json({ message: "categorie non trouvé" });
    }

    res.status(200).json({
        success : true,
        message : "categorie mis à jour avec succés",
        data : categoryUpdated
    })
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du categorie", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.categoryId;
        const categoryDeleted = await Category.findByIdAndDelete(id);

        if(!categoryDeleted){
           return res.status(404).json({ message: "categorie non trouvé" });
        }

        res.status(200).json({
            success : true,
            message : "categorie supprimer avec succés"
        })
    } catch (error) {
         res.status(500).json({ message: "Erreur lors de la suppression du categorie", error: error.message });
    }
}
