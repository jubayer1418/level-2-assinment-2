/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { userRoute } from './app/modules/user/user.route';
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use('/api', userRoute);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    messege: 'aip not found!',
  });
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(err.status || 500).json({
      success: false,
      messege: err.message || 'Unknown Error!',
      error: {
        code: err.status || 500,
        description: err.message || 'Unknown Error!',
      },
    });
  }
});
export default app;
