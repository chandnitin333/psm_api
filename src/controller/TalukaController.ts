import { createTaluka, deleteTaluka, getAllTalukas, getTaluka, updateTaluka } from '../models/Taluka';
import { ApiResponse } from '../utils/ApiResponse';
export class TalukaController {

    static async createTaluka(req, res, next) {
        try {
            let { name, district_id} = req.body;
            let taluka: any = await createTaluka(name, district_id);
            let response = ApiResponse.successResponse(res, taluka.name+" Taluka created successfully");
            return response;
        } catch (error) {
           let response = ApiResponse.ErrorResponse(res, "Failed to create taluka", error);
                return response;
        }
    }

    static async getAllTaluka(req, res, next) {
        try {
            let offset:any = process.env.PAGE_OFFSET || 0;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body?.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }

            let talukas = await getAllTalukas(params);
            let response = ApiResponse.successResponseWithData(res, "Taluka fetched successfully", talukas);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Taluka", error);
            return response;
        }
    }

    static async getTaluka(req, res, next) {
        try {
            let data = req.body;
            let taluka = await getTaluka(parseInt(data.id));
            let response = ApiResponse.successResponseWithData(res, "Taluka fetched successfully", taluka);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Taluka", error);
            return response;
        }
    }

    static async updateTaluka(req, res, next) {
        try {
            let data = req.body;
            let taluka = await updateTaluka(parseInt(data.id), { name: data.name, district_id: data.district_id });
            let response = ApiResponse.successResponseWithData(res, "Taluka updated successfully", taluka);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to update Taluka", error);
            return response;
        }
    }
    
    static async deleteTaluka(req, res, next) {
        try {
            let data = req.body;
            let taluka = await deleteTaluka(parseInt(data.id));
            let response = ApiResponse.successResponseWithData(res, "Taluka deleted successfully", taluka);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to delete Taluka", error);
            return response;
        }
    }

}