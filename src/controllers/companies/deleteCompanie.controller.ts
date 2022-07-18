import { Request, Response } from "express";
import deleteCompanieService from "../../services/companies/deleteCompanie.service";

const deleteCompanyController = async (req: Request, res: Response) => {
 
    const { id } = req.params;

    const user = await deleteCompanieService({id})

    return res.status(200).json({ message: "Companie deleted" });
  
};

export default deleteCompanyController;
