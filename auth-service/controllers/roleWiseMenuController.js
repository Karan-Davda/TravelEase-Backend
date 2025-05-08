import db from '../config/database.js';
const { RoleWiseMenu } = db.models;

export const createRoleWiseMenu = async (req, res) => {
  const { RoleID, IsLandingPage } = req.body;

  try {
    if (IsLandingPage) {
      await RoleWiseMenu.update(
        { IsLandingPage: false },
        { where: { RoleID } }
      );
    }

    const record = await RoleWiseMenu.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    console.error('Create role-wise menu failed:', err);
    res.status(500).json({ message: 'Creation failed' });
  }
};

export const updateRoleWiseMenu = async (req, res) => {
  const { id } = req.params;
  const { RoleID, IsLandingPage } = req.body;

  try {
    if (IsLandingPage) {
      await RoleWiseMenu.update(
        { IsLandingPage: false },
        {
          where: {
            RoleID,
            RoleWiseMenuID: { [db.Sequelize.Op.ne]: id }, // exclude the current record
          },
        }
      );
    }

    await RoleWiseMenu.update(req.body, { where: { RoleWiseMenuID: id } });
    res.json({ message: 'Record updated' });
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ message: 'Update failed' });
  }
};

export const getAllRoleWiseMenus = async (req, res) => {
  try {
    const records = await RoleWiseMenu.findAll();
    res.json(records);
  } catch (err) {
    console.error('Fetch all role-wise menus failed:', err);
    res.status(500).json({ message: 'Failed to fetch records' });
  }
};

export const getRoleWiseMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await RoleWiseMenu.findByPk(id);
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json(record);
  } catch (err) {
    console.error('Fetch role-wise menu by ID failed:', err);
    res.status(500).json({ message: 'Failed to fetch record' });
  }
};

// export const updateRoleWiseMenu = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await RoleWiseMenu.update(req.body, { where: { RoleWiseMenuID: id } });
//     res.json({ message: 'Record updated' });
//   } catch (err) {
//     console.error('Update failed:', err);
//     res.status(500).json({ message: 'Update failed' });
//   }
// };

export const deleteRoleWiseMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await RoleWiseMenu.destroy({ where: { RoleWiseMenuID: id } });
    res.json({ message: 'Record deleted' });
  } catch (err) {
    console.error('Delete failed:', err);
    res.status(500).json({ message: 'Delete failed' });
  }
};