import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { connect } from './db';
import userRouter from './routes/user';
import productRouter from './routes/product';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(cookieParser());

app.get('/hello', (req: Request, res: Response) => {
  res.json({
    message: 'Hello',
    status: 200,
  });
});

app.use('/user', userRouter);
app.use('/product', productRouter);

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
});
