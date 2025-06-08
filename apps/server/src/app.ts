import express from "express";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Hello",
    status: 200,
  });
});

const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

app.listen(SERVER_PORT, (error) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log(`server ready at http://${SERVER_HOST}:${SERVER_PORT}/`);
  }
});
