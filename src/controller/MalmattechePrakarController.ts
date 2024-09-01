import { Logger } from '../logger/Logger';
import { createMalmattechePrakar, deleteMalmattechePrakar, findMalmattechePrakar, getAllMalmattechePrakarForDDL, getAllMalmattechePrakars, getMalmattechePrakar, getMalmattechePrakarCount, updateMalmattechePrakar } from '../models/MalmattechePrakar';
import { ApiResponse } from '../utils/ApiResponse';
const logger = new Logger().logger;

export class MalmattechePrakarController {

    static async createMalmattechePrakar(req, res, next) {
        try {
            let { name } = req.body;
             let params = {
                searchText: name
            }
            let avialablePrakar = await findMalmattechePrakar(params);
            if(avialablePrakar.length == 0){
                let prakar: any = await createMalmattechePrakar(name);
                return ApiResponse.successResponse(res, prakar.name+" Malmatteche Prakar created successfully");
            }else{
                return ApiResponse.successResponse(res, name+" Malmatteche Prakar alraedy exist");
            }
        } catch (error) {
            logger.error(`Error in MalmattechePrakarController/createMalmattechePrakar: ${error}`);
            return ApiResponse.ErrorResponse(res, "Failed to create Malmatteche Prakar", error);
        }
    }

    static async getAllMalmattechePrakars(req, res, next) {
        try {
            let offset:number = parseInt(process.env.PAGE_OFFSET) || 0;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body?.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }

            let prakars = await getAllMalmattechePrakars(params);
            let totalCount = (searchText == '') ? await getMalmattechePrakarCount() : Object.keys(prakars).length;
            let response = ApiResponse.successResponseWithData(res, "Malmatteche Prakar fetched successfully", {prakars, totalCount: totalCount});
            return response;
        } catch (error) {
            logger.error(`Error in MalmattechePrakarController/getAllMalmattechePrakars: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Malmatteche Prakar", error);
            return response;
        }
    }

    static async getMalmattechePrakar(req, res, next) {
        try {
            let prakar = await getMalmattechePrakar(parseInt(req.params.mal_prakar_id));
            if(prakar == null){
                let response = ApiResponse.successResponseWithData(res, "Malmatteche Prakar not found", []);
                return response;
            }
            let response = ApiResponse.successResponseWithData(res, "Malmatteche Prakar fetched successfully", prakar);
            return response;
        } catch (error) {
            logger.error(`Error in MalmattechePrakarController/getMalmattechePrakar: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Malmatteche Prakar", error);
            return response;
        }
    }

    static async updateMalmattechePrakar(req, res, next) {
        try {
            let data = req.body;
            let avialablePrakar = await findMalmattechePrakar({ searchText: data.name });
            if (avialablePrakar.length > 0) {
                return ApiResponse.ErrorResponse(res, "Malmatteche Prakar name already exists");
            }
            let prakar = await updateMalmattechePrakar(parseInt(data.id), { name: data.name });
            let response = ApiResponse.successResponseWithData(res, "Malmatteche Prakar updated successfully", prakar);
            return response;
        } catch (error) {
            logger.error(`Error in MalmattechePrakarController/updateMalmattechePrakar: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to update Malmatteche prakar", error);
            return response;
        }
    }

    static async deleteMalmattechePrakar(req, res, next) {
        try {
            let prakar = await deleteMalmattechePrakar(parseInt(req.params.mal_prakar_id));
            let response = ApiResponse.successResponseWithData(res, "Malmatteche Prakar deleted successfully", prakar);
            return response;
        } catch (error) {
            logger.error(`Error in MalmattechePrakarController/deleteMalmattechePrakar: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to delete Malmatteche Prakar", error);
            return response;
        }
    }

    static async getAllMalmattechePrakarForDDL(req, res, next) {
        try {
            let districts = await getAllMalmattechePrakarForDDL();
            let response = ApiResponse.successResponseWithData(res, "Malmatteche Prakar fetched successfully", districts);
            return response;
        } catch (error) {
            logger.error(`Error in MalmattechePrakarController/getAllMalmattechePrakarForDDL: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Malmatteche Prakar", error);
            return response;
        }
    }
}