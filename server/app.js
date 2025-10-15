import express from "express"
import cors from 'cors'
import dotenv from "dotenv";
import mongoose from "mongoose";
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config();


const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json())

//routes
app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Mongodb Connected"))
.catch((err)=> console.log(`MongoDB error: ${err}`))

app.listen(PORT, ()=> console.log(`app listening on http://localhost:${PORT}`))

