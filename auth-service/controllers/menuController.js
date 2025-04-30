// controllers/menuController.js
import Menu from '../models/Menu.js';

export const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching menus' });
  }
};

export const createMenu = async (req, res) => {
  try {
    const newMenu = await Menu.create({
      ...req.body,
      Created: new Date(),
      Modified: new Date()
    });
    res.status(201).json(newMenu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating menu' });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const updated = await Menu.update(
      { ...req.body, Modified: new Date() },
      { where: { MenuID: req.params.menuId } }
    );
    res.json({ message: 'Menu updated', rowsAffected: updated[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating menu' });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    await Menu.destroy({ where: { MenuID: req.params.menuId } });
    res.json({ message: 'Menu deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting menu' });
  }
};