const express = require('express');
const router = express.Router();

// Sample data (replace with DB query later)
const destinations = [
    { id: 1, name: "New York City" },
    { id: 2, name: "Los Angeles" },
    { id: 3, name: "Las Vegas" },
    { id: 4, name: "Miami" }
];

// GET: Fetch all destinations
router.get('/', (req, res) => {
    res.json(destinations);
});

module.exports = router;