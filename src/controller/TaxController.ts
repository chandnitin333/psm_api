import { Logger } from '../logger/Logger';
import { createTax, deleteTax, findTax, getAllTax, getTax, getTaxCount, updateTax } from '../models/Tax';
import { ApiResponse } from '../utils/ApiResponse';
const logger = new Logger().logger;

export class TaxController {

    static async createTax(req, res, next) {
        try {
            let { tax_name } = req.body;
             let params = {
                searchText: tax_name
            }
            let available = await findTax(params);
            if(available.length == 0){
                let result: any = await createTax(tax_name);
                return ApiResponse.successResponse(res, result.tax_name+" Tax created successfully");
            }else{
                return ApiResponse.successResponse(res, tax_name+" Tax alraedy exist");
            }
        } catch (error) {
            logger.error(`Error in TaxController/createTax: ${error}`);
            return ApiResponse.ErrorResponse(res, "Failed to create Tax", error);
        }
    }

    static async getAllTax(req, res, next) {
        try {
            let offset:number = parseInt(process.env.PAGE_OFFSET) || 0;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body?.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }

            let result = await getAllTax(params);
            let totalCount = (searchText == '') ? await getTaxCount() : Object.keys(result).length;
            let response = ApiResponse.successResponseWithData(res, "Tax fetched successfully", {result, totalCount: totalCount});
            return response;
        } catch (error) {
            logger.error(`Error in TaxController/getAllTax: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Tax", error);
            return response;
        }
    }

    static async getTax(req, res, next) {
        try {
            let result = await getTax(parseInt(req.params.id));
            if(result == null){
                return ApiResponse.successResponseWithData(res, "Tax not found", []);
            }
            return  ApiResponse.successResponseWithData(res, "Tax fetched successfully", result);
        } catch (error) {
            logger.error(`Error in TaxController/getTax: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch getTax", error);
            return response;
        }
    }

    static async updateTax(req, res, next) {
        try {
            let data = req.body;
            let available = await findTax({ searchText: data.tax_name});
            if (available.length > 0) {
                return ApiResponse.ErrorResponse(res, "Tax name already exists",200);
            }
            let result = await updateTax(parseInt(data.id), { tax_name: data.tax_name});
            return ApiResponse.successResponseWithData(res, "Tax updated successfully", result);
             
        } catch (error) {
            logger.error(`Error in TaxController/updateTax: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to update Tax", error);
            return response;
        }
    }

    static async deleteTax(req, res, next) {
        try {
            let result = await deleteTax(parseInt(req.params.id));
            return ApiResponse.successResponseWithData(res, "Tax deleted successfully", result);
        } catch (error) {
            logger.error(`Error in TaxController/deleteTax: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to delete Tax", error);
            return response;
        }
    }
}