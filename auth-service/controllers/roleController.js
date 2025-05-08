import db from '../config/database.js';
const { Role } = db.models;

export const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (err) {
    console.error('Create role failed:', err);
    res.status(500).json({ message: 'Role creation failed' });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (err) {
    console.error('Fetch roles failed:', err);
    res.status(500).json({ message: 'Failed to fetch roles' });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (err) {
    console.error('Fetch role by ID failed:', err);
    res.status(500).json({ message: 'Failed to fetch role' });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    await Role.update(req.body, { where: { RoleID: id } });
    res.json({ message: 'Role updated' });
  } catch (err) {
    console.error('Update role failed:', err);
    res.status(500).json({ message: 'Role update failed' });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await Role.destroy({ where: { RoleID: id } });
    res.json({ message: 'Role deleted' });
  } catch (err) {
    console.error('Delete role failed:', err);
    res.status(500).json({ message: 'Role deletion failed' });
  }
};