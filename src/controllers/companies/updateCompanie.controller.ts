import { Request, Response } from "express";
import updateCompanieService from "../../services/companies/updateCompanie.service";

const updateCompanyController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const company = await updateCompanieService({
      id,
      name,
    });

    return res.status(201).json({ message: "Companie updated", company});
  
};

export default updateCompanyController;
