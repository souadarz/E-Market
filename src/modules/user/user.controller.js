import User from "./user.model.js";

export const createUser = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "utilisateur déjà exist" });
    }

    const newUser = new User({
        fullname,
        email,
        password,
        role: role || "user"
    });
    const user = await newUser.save();
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'utilisateur :",
      error.message
    );
    res
      .status(500)
      .json({
        message: "Impossible de créer l'utilisateur",
        error: error.message,
      });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "aucun utilisateur trouvé" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des utilisateurs :",
      error.message
    );
    res
      .status(500)
      .json({
        message: "Impossible de récupérer les utilisateurs",
        error: error.message,
      });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.userId;
    // return res.json({ data: id });
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "aucun utilisateur trouvé" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const updatedData = req.body;
    const userUpdated = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!userUpdated) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({
        success : true,
        message : "utilisateur mis à jour avec succés",
        data : userUpdated
    })
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour d'utilisateur", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.userId;
        const userDeleted = await User.findByIdAndDelete(id);

        if(!userDeleted){
           return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json({
            success : true,
            message : "utilisateur supprimer avec succés"
        })
    } catch (error) {
         res.status(500).json({ message: "Erreur lors de la suppression d'utilisateur", error: error.message });
    }
}
