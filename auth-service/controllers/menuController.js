import db from '../config/database.js';
import { match } from 'path-to-regexp';
const { Menu } = db.models;

export const createMenu = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      ParentMenuID: req.body.ParentMenuID || null, // ← force empty string to null
    };

    const menu = await Menu.create(payload);
    
    res.status(201).json(menu);
  } catch (err) {
    console.error('Create menu failed:', err);
    res.status(500).json({ message: 'Menu creation failed' });
  }
};

export const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (err) {
    console.error('Fetch menus failed:', err);
    res.status(500).json({ message: 'Failed to fetch menus' });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);
    if (!menu) return res.status(404).json({ message: 'Menu not found' });
    res.json(menu);
  } catch (err) {
    console.error('Fetch menu by ID failed:', err);
    res.status(500).json({ message: 'Failed to fetch menu' });
  }
};

export const checkLoginRequiredByUrl = async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ message: 'URL is required as query param' });
    }

    const allMenus = await Menu.findAll({
      attributes: ['MenuID', 'MenuName', 'URL', 'IsLogginRequired']
    });

    const matchedMenu = allMenus.find(menu => {
      const matcher = match(menu.URL, { decode: decodeURIComponent });
      return matcher(url.toString());
    });

    if (!matchedMenu) {
      return res.status(404).json({ message: 'Menu not found for provided URL' });
    }

    res.status(200).json({
      MenuID: matchedMenu.MenuID,
      MenuName: matchedMenu.MenuName,
      IsLogginRequired: matchedMenu.IsLogginRequired
    });

  } catch (err) {
    console.error('Login check failed:', err);
    res.status(500).json({ message: 'Failed to check login requirement' });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await Menu.update(req.body, { where: { MenuID: id } });
    res.json({ message: 'Menu updated' });
  } catch (err) {
    console.error('Update menu failed:', err);
    res.status(500).json({ message: 'Menu update failed' });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await Menu.destroy({ where: { MenuID: id } });
    res.json({ message: 'Menu deleted' });
  } catch (err) {
    console.error('Delete menu failed:', err);
    res.status(500).json({ message: 'Menu deletion failed' });
  }
};