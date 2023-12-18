import express from 'express';
import { userController } from './user.controller';
const router = express.Router();
router.post('/users', userController.createController);
router.get('/users', userController.allUser);
router.get('/users/:userId', userController.singleUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);
router.put('/users/:userId/orders', userController.updateOrderUser);
router.get('/users/:userId/orders', userController.getOrderController);
router.get(
  '/users/:userId/orders/total-price',
  userController.getTotalOrderController,
);
export const userRoute = router;
