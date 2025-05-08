import NotificationTemplate from '../models/NotificationTemplate.js';

export const createTemplate = async (req, res) => {
  try {
    const template = await NotificationTemplate.create(req.body);
    res.status(201).json(template);
  } catch (err) {
    console.error('Create template failed:', err);
    res.status(500).json({ message: 'Template creation failed' });
  }
};

export const getAllTemplates = async (req, res) => {
  try {
    const templates = await NotificationTemplate.findAll();
    res.json(templates);
  } catch (err) {
    console.error('Fetch templates failed:', err);
    res.status(500).json({ message: 'Failed to fetch templates' });
  }
};

export const getTemplateById = async (req, res) => {
  try {
    const template = await NotificationTemplate.findByPk(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (err) {
    console.error('Fetch template by ID failed:', err);
    res.status(500).json({ message: 'Failed to fetch template' });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    await NotificationTemplate.update(req.body, { where: { NotificationTemplateID: req.params.id } });
    res.json({ message: 'Template updated' });
  } catch (err) {
    console.error('Update template failed:', err);
    res.status(500).json({ message: 'Template update failed' });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    await NotificationTemplate.destroy({ where: { NotificationTemplateID: req.params.id } });
    res.json({ message: 'Template deleted' });
  } catch (err) {
    console.error('Delete template failed:', err);
    res.status(500).json({ message: 'Template deletion failed' });
  }
};