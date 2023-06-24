const express = require("express");
const { default: User } = require("../models/user");
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({ Activo: true }).populate({ path: 'Oficio', select: 'Nombre' });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/users:id", async (req, res) => {
  const {id} = req.params;

  try {
    const users = await User.findOne(
      { _id: id }
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Ruta para crear un nuevo usuario
router.post("/users", async (req, res) => {
  const { Nombre, Apellido } = req.body;
  try {
    const usuarioDuplicado = await User.findOne({ 
      Nombre: { $regex: new RegExp('^' + Nombre.trim() + '$', 'i') },
      Apellido: { $regex: new RegExp('^' + Apellido.trim() + '$', 'i') },
      Activo: true,
     }
    ) 
    if(usuarioDuplicado){
      return res.status(500).send('Usuario existente');
    }
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// Ruta para actualizar un usuario
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { Nombre, Apellido, _id } = req.body;

  try {
    const usuarioDuplicado = await User.findOne({ 
      Nombre: { $regex: new RegExp('^' + Nombre.trim() + '$', 'i') },
      Apellido: { $regex: new RegExp('^' + Apellido.trim() + '$', 'i') },
      Activo: true,
      _id: { $ne: id },
     }
    ) 
    if(usuarioDuplicado){
      return res.status(500).send('Usuario existente');
    }
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});
router.put("/users/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate({ _id: id }, { Activo: false }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ruta para eliminar un usuario
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;