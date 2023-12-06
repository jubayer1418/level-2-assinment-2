import { Request, Response } from 'express';
import { userService } from './user.service';

const createController = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const result = await userService.createUserIntoDb(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    console.log({ err });
  }
};
const allUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDb();
    res.status(200).json({
      success: true,
      message: 'users fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const singleUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    console.log(id);
    const result = await userService.getSingleUserFromDb(id);
    res.status(200).json({
      success: true,
      message: 'user fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: err.message,
      },
    });
    console.log({ err });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const data = req.body.user;
    const id = parseInt(req.params.userId);

    const result = await userService.updateUserFromDb(id, data);
    res.status(200).json({
      success: true,
      message: 'user updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: err.message,
      },
    });
    console.log({ err });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    console.log(id);
    await userService.deleteUserFromDb(id);
    res.status(200).json({
      success: true,
      message: 'user deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: err.message,
      },
    });
    console.log({ err });
  }
};
export const userController = {
  createController,
  allUser,
  singleUser,
  updateUser,
  deleteUser,
};
