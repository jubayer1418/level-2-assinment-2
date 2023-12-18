import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';
import userValidationSchema from './user.validation';

const createController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.body.user;
    const userValid = userValidationSchema.parse(user);
    const result = await userService.createUserIntoDb(userValid);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    next(err);
  }
};
const allUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAllUserFromDb();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const singleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.userId);

    const result = await userService.getSingleUserFromDb(id);
    res.status(200).json({
      success: true,
      message: 'user fetched successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body.user;
    const id = parseInt(req.params.userId);

    const result = await userService.updateUserFromDb(id, data);
    if (!result) {
      throw new Error('User not found!');
    }
    res.status(200).json({
      success: true,
      message: 'user updated successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const updateOrderUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.userId);

    const result = await userService.updateUserOrderFromDb(id, req.body);
    if (!result) {
      throw new Error('User not found!');
    }
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.userId);

    const data = await userService.deleteUserFromDb(id);
    if (!data) {
      throw new Error('User not found!');
    }
    res.status(200).json({
      success: true,
      message: 'user deleted successfully!',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
const getOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.userId);

    const orders = await userService.getUserOrderFromDb(id);
    if (!orders) {
      throw new Error('User not found!');
    }
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};
const getTotalOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.userId);

    const orders = await userService.getTotalOrderFromDb(id);
    if (!orders) {
      throw new Error('User not found!');
    }
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};
export const userController = {
  createController,
  allUser,
  singleUser,
  updateUser,
  deleteUser,
  updateOrderUser,
  getOrderController,
  getTotalOrderController,
};
