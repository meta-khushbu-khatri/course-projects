import  express from "express";
import dotenv from "dotenv";
import cors from "cors"
import db from './utilty/db.js';
import cookieParser from "cookie-parser";


//import_all_routes

import userRoutes from "./routes/user.routes.js"

dotenv.config();
const app = express()
const port = 3000

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials:true,
    methods: ['GET', 'POST','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization']
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

//port = process.env.PORT || 4000;

app.get('/hello', (req, res) => {
  res.send('Hello World!')
});

app.get('/', (req, res) => {
  res.send('Hey kk!')
});

app.get('/', (req, res) => {
  res.send('How r u?')
});

db();
app.use("/api/v1/user",userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})