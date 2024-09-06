import { Logger } from '../logger/Logger';
import { createMalmatta, deleteMalmatta, findMalmatta, getAllMalmatta, getMalmatta, getMalmattaCount, updateMalmatta } from '../models/Malmatta';
import { ApiResponse } from '../utils/ApiResponse';
const logger = new Logger().logger;

export class MalmattaController {

    static async createMalmatta(req, res, next) {
        try {
            let { milkateche_varnan, malmatteche_prakar_name } = req.body;
             let params = {
                malmatteche_prakar_name: malmatteche_prakar_name,
                searchText: milkateche_varnan
            }
            let available = await findMalmatta(params);
            if(available.length == 0){
                let result: any = await createMalmatta(milkateche_varnan, malmatteche_prakar_name);
                return ApiResponse.successResponse(res, result.milkateche_varnan+" Malmatta created successfully");
            }else{
                return ApiResponse.successResponse(res, milkateche_varnan+" Malmatta alraedy exist");
            }
        } catch (error) {
            logger.error(`Error in MalmattaController/createMalmatta: ${error}`);
            return ApiResponse.ErrorResponse(res, "Failed to create Malmatta", error);
        }
    }

    static async getAllMalmatta(req, res, next) {
        try {
            let offset:number = parseInt(process.env.PAGE_OFFSET) || 0;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body?.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }

            let result = await getAllMalmatta(params);
            let totalCount = (searchText == '') ? await getMalmattaCount() : Object.keys(result).length;
            let response = ApiResponse.successResponseWithData(res, "Malmatta fetched successfully", {result, totalCount: totalCount});
            return response;
        } catch (error) {
            logger.error(`Error in MalmattaController/getAllMalmatta: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Malmatta", error);
            return response;
        }
    }

    static async getMalmatta(req, res, next) {
        try {
            let result = await getMalmatta(parseInt(req.params.malmatta_id));
            if(result == null){
                return ApiResponse.successResponseWithData(res, "Malmatta not found", []);
            }
            return  ApiResponse.successResponseWithData(res, "Malmatta fetched successfully", result);
        } catch (error) {
            logger.error(`Error in MalmattaController/getMalmatta: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Malmatta", error);
            return response;
        }
    }

    static async updateMalmatta(req, res, next) {
        try {
            let data = req.body;
            let available = await findMalmatta({ searchText: data.milkateche_varnan, malmatteche_prakar_name: data.malmatteche_prakar_id });
            if (available.length > 0) {
                return ApiResponse.ErrorResponse(res, "Malmatta name already exists",200);
            }
            let result = await updateMalmatta(parseInt(data.id), { milkateche_varnan: data.milkateche_varnan, malmatteche_prakar_name: data.malmatteche_prakar_name });
            return ApiResponse.successResponseWithData(res, "Malmatta updated successfully", result);
             
        } catch (error) {
            logger.error(`Error in MalmattaController/updateMalmatta: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to update Malmatta", error);
            return response;
        }
    }

    static async deleteMalmatta(req, res, next) {
        try {
            let result = await deleteMalmatta(parseInt(req.params.malmatta_id));
            return ApiResponse.successResponseWithData(res, "Malmatta deleted successfully", result);
        } catch (error) {
            logger.error(`Error in MalmattaController/deleteMalmatta: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to delete Malmatta", error);
            return response;
        }
    }
}