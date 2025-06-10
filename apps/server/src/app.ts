import express from "express";
import "dotenv/config";
import { connect } from "./db"
import userRouter from "./routes/user";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
    res.json({
        message: "Hello",
        status: 200,
    });
});

app.use("/user", userRouter)

const SERVER_PORT = process.env.SERVER_PORT;
const SERVER_HOST = process.env.SERVER_HOST;


connect().then(() => {
    app.listen(SERVER_PORT, (error) => {
        if (error) {
            console.log(error.message);
        } else {
            console.log(`server ready at http://${SERVER_HOST}:${SERVER_PORT}/`);
        }
    });
})