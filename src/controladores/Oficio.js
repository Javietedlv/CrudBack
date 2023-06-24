const express = require("express");
const { default: Oficio } = require("../models/oficio");
const router = express.Router();

// Ruta para obtener todos los oficios
router.get("/oficio", async (req, res) => {
  try {
    const List = await Oficio.find({ Activo: true });
    res.json(List);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/oficio:id", async (req, res) => {
  const {id} = req.params;

  try {
    const Oficios = await Oficio.findOne(
      { _id: id }
    );
    res.json(Oficios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Ruta para crear un nuevo oficio
router.post("/oficio", async (req, res) => {
  const { Nombre, Sector } = req.body;
  try {
    const oficioDuplicado = await Oficio.findOne({ 
      Nombre: { $regex: new RegExp('^' + Nombre.trim() + '$', 'i') },
      Sector: { $regex: new RegExp('^' + Sector.trim() + '$', 'i') },
      Activo: true,
     }
    ) 
    if(oficioDuplicado){
      return res.status(500).send('Oficio existente');
    }
    const oficioGuardar = new Oficio(req.body);
    const newOficio = await oficioGuardar.save();
    res.status(201).json(newOficio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ruta para actualizar un oficio
router.put("/oficio/:id", async (req, res) => {
  const { id } = req.params;
  const { Nombre, Sector, _id } = req.body;

  try {
    const oficioDuplicado = await Oficio.findOne({ 
      Nombre: { $regex: new RegExp('^' + Nombre.trim() + '$', 'i') },
      Sector: { $regex: new RegExp('^' + Sector.trim() + '$', 'i') },
      Activo: true,
      _id: { $ne: id },
     }
    ) 
    if(oficioDuplicado ){
      return res.status(500).send('Oficio existente');
    }
    const oficio = await Oficio.findByIdAndUpdate(id, req.body, { new: true });
    res.json(oficio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Borrado lógico de oficio 
router.put("/oficio/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oficio = await Oficio.findByIdAndUpdate({ _id: id }, { Activo: false }, { new: true });
    res.json(oficio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ruta para eliminar un oficio
router.delete("/oficio/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Oficio.findByIdAndDelete(id);
    res.json({ message: "Oficio eliminado correctamente" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;