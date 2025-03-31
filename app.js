const express = require('express');
const cors = require('cors');
require('dotenv').config();

const destinationRoutes = require('./routes/destinations');


const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/destinations', destinationRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});