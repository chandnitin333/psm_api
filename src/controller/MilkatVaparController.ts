import { Logger } from '../logger/Logger';
import { createMalmattechePrakar, deleteMalmattechePrakar, findMalmattechePrakar, getAllMalmattechePrakars, getMalmattechePrakar, getMalmattechePrakarCount, updateMalmattechePrakar } from '../models/MalmattechePrakar';
import { createMilkatVapar, deleteMilkatVapar, findMilkatVapar, getAllMilkatVapar, getMilkatVapar, getMilkatVaparCount, updateMilkatVapar } from '../models/MilkatVapar';
import { ApiResponse } from '../utils/ApiResponse';
const logger = new Logger().logger;

export class MilkatVaparController {

    static async createMilkatVapar(req, res, next) {
        try {
            let { name, malmatteche_prakar_id } = req.body;
             let params = {
                malmatteche_prakar_id: malmatteche_prakar_id,
                searchText: name
            }
            let avialablevapar = await findMilkatVapar(params);
            if(avialablevapar.length == 0){
                let milkat: any = await createMilkatVapar(name, malmatteche_prakar_id);
                return ApiResponse.successResponse(res, milkat.name+" Milkat vapar created successfully");
            }else{
                return ApiResponse.successResponse(res, name+" Milkat vapar alraedy exist");
            }
        } catch (error) {
            logger.error(`Error in MilkatVaparController/createMilkatVapar: ${error}`);
            return ApiResponse.ErrorResponse(res, "Failed to create Milkat vapar", error);
        }
    }

    static async getAllMilkatVapar(req, res, next) {
        try {
            let offset:number = parseInt(process.env.PAGE_OFFSET) || 0;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body?.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }

            let milkat = await getAllMilkatVapar(params);
            let totalCount = (searchText == '') ? await getMilkatVaparCount() : Object.keys(milkat).length;
            let response = ApiResponse.successResponseWithData(res, "Milkat vapar fetched successfully", {milkat, totalCount: totalCount});
            return response;
        } catch (error) {
            logger.error(`Error in MilkatVaparController/getAllMilkatVapar: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Milkat vapar", error);
            return response;
        }
    }

    static async getMilkatVapar(req, res, next) {
        try {
            let prakar = await getMilkatVapar(parseInt(req.params.milkat_id));
            if(prakar == null){
                let response = ApiResponse.successResponseWithData(res, "Milkat vapar not found", []);
                return response;
            }
            let response = ApiResponse.successResponseWithData(res, "Milkat vapar fetched successfully", prakar);
            return response;
        } catch (error) {
            logger.error(`Error in MilkatVaparController/getMilkatVapar: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Milkat vapar", error);
            return response;
        }
    }

    static async updateMilkatVapar(req, res, next) {
        try {
            let data = req.body;
            let avialablePrakar = await findMilkatVapar({ searchText: data.name, malmatteche_prakar_id: data.malmatteche_prakar_id });
            console.log("test",avialablePrakar);
            if (avialablePrakar.length > 0) {
                return ApiResponse.ErrorResponse(res, "Milkat vapar name already exists",200);
            }
            let prakar = await updateMilkatVapar(parseInt(data.id), { name: data.name, malmatteche_prakar_id: data.malmatteche_prakar_id });
            let response = ApiResponse.successResponseWithData(res, "Milkat vapar updated successfully", prakar);
            return response;
        } catch (error) {
            logger.error(`Error in MilkatVaparController/updateMilkatVapar: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to update Milkat vapar", error);
            return response;
        }
    }

    static async deleteMilkatVapar(req, res, next) {
        try {
            let prakar = await deleteMilkatVapar(parseInt(req.params.milkat_id));
            let response = ApiResponse.successResponseWithData(res, "Milkat vapar deleted successfully", prakar);
            return response;
        } catch (error) {
            logger.error(`Error in MilkatVaparController/deleteMilkatVapar: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to delete Milkat vapar", error);
            return response;
        }
    }
}