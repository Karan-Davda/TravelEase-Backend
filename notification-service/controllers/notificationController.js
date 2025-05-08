import Notification from '../models/Notification.js';

export const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (err) {
    console.error('Create notification failed:', err);
    res.status(500).json({ message: 'Notification creation failed' });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (err) {
    console.error('Fetch notifications failed:', err);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};

export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (err) {
    console.error('Fetch notification by ID failed:', err);
    res.status(500).json({ message: 'Failed to fetch notification' });
  }
};

export const updateNotification = async (req, res) => {
  try {
    await Notification.update(req.body, { where: { NotificationID: req.params.id } });
    res.json({ message: 'Notification updated' });
  } catch (err) {
    console.error('Update notification failed:', err);
    res.status(500).json({ message: 'Notification update failed' });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    await Notification.destroy({ where: { NotificationID: req.params.id } });
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    console.error('Delete notification failed:', err);
    res.status(500).json({ message: 'Notification deletion failed' });
  }
};