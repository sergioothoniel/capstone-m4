import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import updateCompanieService from "../../services/companies/updateCompany.service";

const userUpdateController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  if (!id) {
    throw new AppError("ID not entered");
  }

  const user = await updateCompanieService({
    id,
    data,
  });

  return res.status(201).json({ message: "Companie updated" });
};

export default userUpdateController;
