const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
const authRoutes = require('./routes/authroutes');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

// conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Auth Service funcionando");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});