import { Request, Response } from "express";
import deleteCompanieService from "../../services/companies/deleteCompanie.service";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await deleteCompanieService({ id });

    return res.status(200).json({ message: "Companie deleted" });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default deleteUserController;
