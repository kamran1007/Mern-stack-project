import Express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import dotenv from 'dotenv'
const app = Express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true })); // convert the data in json using body parser middleware
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

// app.get('/',(req,res)=> {
//   res.send("App is running successfully")
// })

// mongodb connection
const PORT = process.env.PORT
const URI = process.env.CONNECTION_URL;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server is running on port: http://localhost:${PORT}`))
  )
  .catch((error) => console.log(error.message));
// mongoose.set('useFindAndModify', false);
// mongoose.set('strictQuery',true);
// mongoose.set("debug", true);
// mongoose.set("strictQuery", false)