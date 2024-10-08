import { Logger } from '../logger/Logger';
import {createDistrict, deleteDistrict, findDistrict, getAllDistrictForDDL, getAllDistricts, getDistrict, getDistrictCount, updateDistrict} from '../models/District';
import { ApiResponse } from '../utils/ApiResponse';
const logger = new Logger().logger;
export class DistrictController {
    static async createDisrict(req, res, next) {
        try {
            let { name } = req.body;
             let params = {
                searchText: name
            }
            let avialableDistrict = await findDistrict(params);
            if(avialableDistrict.length == 0){
                let district: any = await createDistrict(name);
                var response = ApiResponse.successResponse(res, district.name+" District created successfully");
            }else{
                var response = ApiResponse.successResponse(res, name+" District alraedy exist");
            }
            return response;
        } catch (error) {
            // logger.info("action:User/login", { message: `User : ${user?.username} logged in successfully at ${new Date().toISOString()}` });
           let response = ApiResponse.ErrorResponse(res, "Failed to create district", error);
                return response;
        }
    }

    static async getAllDistricts(req, res, next) {
        try {
            let offset:number = parseInt(process.env.PAGE_OFFSET) || 0;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body?.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }

            let districts = await getAllDistricts(params);
            let totalCount = (searchText == '') ? await getDistrictCount() : Object.keys(districts).length;
            let response = ApiResponse.successResponseWithData(res, "Districts fetched successfully", {districts, totalCount: totalCount});
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Districts", error);
            return response;
        }
    }

    static async getDistrict(req, res, next) {
        try {
            let data = req.body;
            let district = await getDistrict(parseInt(data.id));
            if(district == null){
                let response = ApiResponse.successResponseWithData(res, "District not found", []);
                return response;
            }
            let response = ApiResponse.successResponseWithData(res, "District fetched successfully", district);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch District", error);
            return response;
        }
    }

    static async updateDistrict(req, res, next) {
        try {
            let data = req.body;
            let district = await updateDistrict(parseInt(data.id), { name: data.name });
            let response = ApiResponse.successResponseWithData(res, "District updated successfully", district);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to update District", error);
            return response;
        }
    }
    
    static async deleteDistrict(req, res, next) {
        try {
            let data = req.body;
            let existDistrict = await getDistrict(parseInt(data.id));
            if(existDistrict == null){
                let response = ApiResponse.successResponse(res, "Sorry we'r unable to find this district for delete operation");
                return response;
            }
            let district = await deleteDistrict(parseInt(data.id));
            let response = ApiResponse.successResponseWithData(res, "District deleted successfully", district);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to delete District", error);
            return response;
        }
    }

    static async getAllDistrictForDDL(req, res, next) {
        try {
            let districts = await getAllDistrictForDDL();
            let response = ApiResponse.successResponseWithData(res, "Districts fetched successfully", districts);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Districts", error);
            return response;
        }
    }
}