import { Logger } from '../logger/Logger';
import { createPrakar, deletePrakar, findPrakar, getAllPrakars, getPrakar, getPrakarCount, updatePrakar } from '../models/Prakar';
import { ApiResponse } from '../utils/ApiResponse';
const logger = new Logger().logger;
export class PrakarController {
    static async createPrakar(req, res, next) {
        try {
            let { prakar_name } = req.body;
             let params = {
                searchText: prakar_name
            }
            let avialablePrakar = await findPrakar(params);
            if(avialablePrakar.length == 0){
                let prakar: any = await createPrakar(prakar_name);
                return ApiResponse.successResponse(res, prakar.prakar_name+" Prakar created successfully");
            }else{
                return ApiResponse.successResponse(res, prakar_name+" Prakar alraedy exist");
            }
        } catch (error) {
            logger.error(`Error in PrakarController/createPrakar: ${error}`);
            return ApiResponse.ErrorResponse(res, "Failed to create Prakar", error);
        }
    }

    static async getAllPrakars(req, res, next) {
        try {
            let offset:number = parseInt(process.env.PAGE_OFFSET) || 0;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body?.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }

            let prakars = await getAllPrakars(params);
            let totalCount = (searchText == '') ? await getPrakarCount() : Object.keys(prakars).length;
            let response = ApiResponse.successResponseWithData(res, "Prakar fetched successfully", {prakars, totalCount: totalCount});
            return response;
        } catch (error) {
            logger.error(`Error in PrakarController/getAllPrakars: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Prakar", error);
            return response;
        }
    }

    static async getPrakar(req, res, next) {
        try {
            let prakar = await getPrakar(parseInt(req.params.prakar_id));
            if(prakar == null){
                let response = ApiResponse.successResponseWithData(res, "Prakar not found", []);
                return response;
            }
            let response = ApiResponse.successResponseWithData(res, "Prakar fetched successfully", prakar);
            return response;
        } catch (error) {
            logger.error(`Error in PrakarController/getPrakar: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Prakar", error);
            return response;
        }
    }

    static async updatePrakar(req, res, next) {
        try {
            let data = req.body;
            let avialablePrakar = await findPrakar({ searchText: data.prakar_name });
            if (avialablePrakar.length > 0) {
                return ApiResponse.ErrorResponse(res, "Prakar name already exists");
            }
            let prakar = await updatePrakar(parseInt(data.id), { prakar_name: data.prakar_name });
            let response = ApiResponse.successResponseWithData(res, "Prakar updated successfully", prakar);
            return response;
        } catch (error) {
            logger.error(`Error in PrakarController/updatePrakar: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to update prakar", error);
            return response;
        }
    }

    static async deletePrakar(req, res, next) {
        try {
            let prakar = await deletePrakar(parseInt(req.params.prakar_id));
            let response = ApiResponse.successResponseWithData(res, "Prakar deleted successfully", prakar);
            return response;
        } catch (error) {
            logger.error(`Error in PrakarController/deletePrakar: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to delete Prakar", error);
            return response;
        }
    }
}