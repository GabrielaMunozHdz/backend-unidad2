import bcrypt from "bcrypt";
import User from "../Models/users.js";

const getAllUsers = async (req, res, next) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ _id: -1 });

    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    next(error);
  }
};

// Obtener usuario por ID (solo admin)
const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Cambiar contraseña
const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verificar contraseña actual
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash nueva contraseña
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Actualizar usuario (solo admin)
const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { email, role } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verificar si el email ya existe (si se está cambiando)
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Actualizar campos
    if (email) user.email = email;
    if (role) user.role = role;
   
    await user.save();

    const updatedUser = await User.findById(userId).select("-hashPassword");

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar cuenta
const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const searchUser = async (req, res, next) => {
  try {
    const {
      q,
      email,
      role,
      sort,
      order,
      page = 1,
      limit = 10,
    } = req.query;
    //http://localhost:3000/api/users/search?q=santiago;
    let filters = {};

    if (q) {
      filters.$or = [
        { email: { $regex: q, $options: "i" } },
      ];
    }

    //http://localhost:3000/api/users/search?sort=email;
    if (role) {
      filters.role = role;
    }

    let sortOptions = {};

    if (sort) {
      const sortOrder = order === "desc" ? -1 : 1;
      sortOptions[sort] = sortOrder;
    } else {
      sortOptions.email = -1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const users = await User.find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const totalResul = await User.find(filters);
    const totalPages = Math.ceil(totalResul / parseInt(limit));

    res.status(200).json({
      users,
      Pagination:{
        currentPage: parseInt(page),
        totalPages,
        totalResul,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      },
      filters:{
        searchTearm: q || null,
        role: role || null,
        isActive: isActive === 'true' ? true : false,
        order: order || 'email'
      }
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try{
    const { email, role, password } = req.body;
    const saltRounds=10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
    email,
    password:hashPassword,
    role,
    });
    await newUser.save();
    res.status(201).json({message:'¡Bienvenido a la comunidad de los diamantes!',email, role });
  }catch (error) {
    next(error);
}
}
export {
  createUser,
  getAllUsers,
  getUserById,
  changePassword,
  updateUser,
  deleteUser,
  searchUser
};
