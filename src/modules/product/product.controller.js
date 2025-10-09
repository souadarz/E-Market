import Product from "./product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { title } = req.body;
    const existingProduct = await Product.findOne({ title });

    if (existingProduct) {
      res.status(400).json({ message: "produit déjà existant" });
    }

    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(
      "Erreur lors de la création du produit :",
      error.message
    );
    res
      .status(500)
      .json({
        message: "Impossible de créer le produit",
        error: error.message,
      });
  }
};

export const getproducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "aucun produit trouvé" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des produits :",
      error.message
    );
    res
      .status(500)
      .json({
        message: "Impossible de récupérer les produits",
        error: error.message,
      });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "aucun produit trouvé" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    const updatedData = req.body;
    const productUpdated = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!productUpdated) {
      return res.status(404).json({ message: "produit non trouvé" });
    }

    res.status(200).json({
        success : true,
        message : "produit mis à jour avec succés",
        data : productUpdated
    })
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.productId;
        const productDeleted = await Product.findByIdAndDelete(id);

        if(!productDeleted){
           return res.status(404).json({ message: "produit non trouvé" });
        }

        res.status(200).json({
            success : true,
            message : "produit supprimer avec succés"
        })
    } catch (error) {
         res.status(500).json({ message: "Erreur lors de la suppression du produit", error: error.message });
    }
}
