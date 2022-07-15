import { Request, Response } from "express";
import updateCompanieService from "../../services/companies/updateCompanie.service";

const userUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      throw new Error("ID not entered");
    }

    const user = await updateCompanieService({
      id,
      name,
    });

    return res.status(201).json({ message: "Companie updated" });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default userUpdateController;
