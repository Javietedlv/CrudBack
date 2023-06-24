const express = require("express");
const { default: Empresa } = require("../models/Empresa");
const router = express.Router();
// const User = require("../models/user");

// Ruta para obtener todos los usuarios
router.get("/Empresas", async (req, res) => {
  try {
    // const users = await Empresa.find();
    const users = await Empresa.find()
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;