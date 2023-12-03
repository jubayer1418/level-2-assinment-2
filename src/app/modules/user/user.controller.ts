import { Request, Response } from 'express';
import { userService } from './user.service';

const createController = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const result = await userService.createUserIntoDb(user);
    res.status(200).json({
      succes: true,
      message: 'user create successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const allUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDb();
    res.status(200).json({
      succes: true,
      message: 'user create successfully',
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
      succes: true,
      message: 'user resieve successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const data = req.body.user;
    const id = parseInt(req.params.userId);
    console.log(id);
    const result = await userService.updateUserFromDb(id, data);
    res.status(200).json({
      succes: true,
      message: 'user resieve successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    console.log(id);
    await userService.deleteUserFromDb(id);
    res.status(200).json({
      succes: true,
      message: 'user deleted successfully!',
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
};
export const userController = {
  createController,
  allUser,
  singleUser,
  updateUser,
  deleteUser,
};
