import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import updateCompanieService from "../../services/companies/updateCompany.service";

const userUpdateController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  if (!id) {
    throw new AppError("ID not entered");
  }

  const company = await updateCompanieService({
    id,
    data,
  });

  return res.status(200).json({
     message: "Companie updated",
     company
     });
};

export default userUpdateController;
