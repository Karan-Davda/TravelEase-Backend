import db from '../config/Database.js';
const { Country, State, City, County } = db.models;

const crud = (model, key) => ({
  create: async (req, res) => {
    try {
      const item = await model.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      console.error(`Create ${key} failed:`, err);
      res.status(500).json({ message: `${key} creation failed` });
    }
  },
  getAll: async (req, res) => {
    try {
      const items = await model.findAll();
      res.json(items);
    } catch (err) {
      console.error(`Fetch ${key}s failed:`, err);
      res.status(500).json({ message: `Failed to fetch ${key}s` });
    }
  },
  getById: async (req, res) => {
    try {
      const item = await model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ message: `${key} not found` });
      res.json(item);
    } catch (err) {
      console.error(`Fetch ${key} by ID failed:`, err);
      res.status(500).json({ message: `Failed to fetch ${key}` });
    }
  },
  update: async (req, res) => {
    try {
      await model.update(req.body, { where: { [`${key}ID`]: req.params.id } });
      res.json({ message: `${key} updated` });
    } catch (err) {
      console.error(`Update ${key} failed:`, err);
      res.status(500).json({ message: `${key} update failed` });
    }
  },
  delete: async (req, res) => {
    try {
      await model.destroy({ where: { [`${key}ID`]: req.params.id } });
      res.json({ message: `${key} deleted` });
    } catch (err) {
      console.error(`Delete ${key} failed:`, err);
      res.status(500).json({ message: `${key} deletion failed` });
    }
  }
});

export const CountryController = crud(Country, 'Country');
export const StateController = crud(State, 'State');
export const CityController = crud(City, 'City');
export const CountyController = crud(County, 'County');