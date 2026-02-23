import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
 

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Successfully connectd to database"))
.catch((err)=> console.log("ERROR",{err}))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`server is running on ${PORT}`)
);


