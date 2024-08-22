import { ConstantData } from '../constant/common';
import { Logger } from '../logger/Logger';
import {createDistrict, deleteDistrict, getAllDistricts, getDistrict, updateDistrict} from '../models/District';
import { ApiResponse } from '../utils/ApiResponse';
export class DistrictController {

    static async createDisrict(req, res, next) {
        try {
            let { name } = req.body;
            let district: any = await createDistrict(name);
            let response = ApiResponse.successResponse(res, district.name+" District created successfully");
            return response;
        } catch (error) {
           let response = ApiResponse.ErrorResponse(res, "Failed to create district", error);
                return response;
        }
    }

    static async getAllDistricts(req, res, next) {
        try {
            /**
             * The offset value used for pagination.
             */
            let offset = ConstantData.PAGE_OFFSET;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body?.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }

            let districts = await getAllDistricts(params);
            let response = ApiResponse.successResponseWithData(res, "Districts fetched successfully", districts);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Districts", error);
            return response;
        }
    }

    static async getDistrict(req, res, next) {
        try {
            let data = req.body;
            console.log(data.id);
            let district = await getDistrict(parseInt(data.id));
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
            let district = await deleteDistrict(parseInt(data.id));
            let response = ApiResponse.successResponseWithData(res, "District deleted successfully", district);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to delete District", error);
            return response;
        }
    }

}