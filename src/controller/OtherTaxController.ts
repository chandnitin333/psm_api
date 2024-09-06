
import { Logger } from '../logger/Logger';
import { createOtherTax, deleteOtherTax, findOtherTax, getAllOtherTax, getOtherTax, getOtherTaxCount, updateOtherTax, updateTaxDetailsx } from '../models/OtherTax';
import { ApiResponse } from '../utils/ApiResponse';
const logger = new Logger().logger;

export class othertaxController {

   static async createOthertax(req, res, next) {
        try {
            let { district_id, taluka_id, grampanchayat_id, tax_details_config } = req.body;
            let tax_details = JSON.stringify(tax_details_config);
            let params = {
                d_id: district_id,
                t_id: taluka_id,
                g_id: grampanchayat_id
            }
            let available = await findOtherTax(params);
            if(available.length > 0){
               return ApiResponse.successResponse(res, "Othertax is already exist");    
            }
            await createOtherTax(district_id, taluka_id, grampanchayat_id, [tax_details]);
            return ApiResponse.successResponse(res, "Othertax is creater successfully");
            
        } catch (error) {
            logger.error(`Error in othertaxController/createOthertax: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to create Othertax", error);
            return response;
        }
    }

    static async getAllOtherTax(req, res, next) {
        try {
             let offset:number = parseInt(process.env.PAGE_OFFSET) || 0;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body?.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }
            let result = await getAllOtherTax(params);
            let totalCount = (searchText == '') ? await getOtherTaxCount() : Object.keys(result).length;
            return ApiResponse.successResponseWithData(res, "All other tax fetched Successfully", { result, totalCount: totalCount });
             
        } catch (error) {
             logger.error(`Error in othertaxController/getAllOtherTax: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch other tax details", error);
            return response;
        }
    }

    static async getOtherTax(req, res, next) {
        try {
            let result = await getOtherTax(parseInt(req.params.id));
            if(result == null){
                return ApiResponse.successResponseWithData(res, "No othet tax details found", []);
            }
            return ApiResponse.successResponseWithData(res, "Other tax fetched successfully", result);
        } catch (error) {
            logger.error(`Error in othertaxController/getOtherTax: ${error}`);
            return ApiResponse.ErrorResponse(res, "Failed to fetch other tax details", error);
        }
    }

    static async updateOtherTax(req, res, next) {
        try {
            let data = req.body;
            let tax_details = JSON.stringify(data.tax_details_config);
            let result = await updateOtherTax(parseInt(data.id), { district_id: data.district_id, taluka_id: data.taluka_id, grampanchayat_id: data.grampanchayat_id, tax_details: [tax_details] });
            return ApiResponse.successResponseWithData(res, "Update other tax details successfully", result);
        } catch (error) {
            logger.error(`Error in othertaxController/updateOtherTax: ${error}`);
            return ApiResponse.ErrorResponse(res, "Failed to update other tax details", error);
        }
    }

    static async deleteCompleteOtherTax(req, res, next) {
        try {
            let available = await getOtherTax(parseInt(req.params.id));
            if(available == null){
                let response = ApiResponse.successResponse(res, "Sorry, We are not able to find the record");
                return response;
            }
            let result = await deleteOtherTax(parseInt(req.params.id));
            let response = ApiResponse.successResponseWithData(res, "Successfully delete the record", result);
            return response;
        } catch (error) {
            logger.error(`Error in othertaxController/deleteCompleteOtherTax: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Can't delete the record", error);
            return response;
        }
    }

    static async deleteSingleTaxDetails(req, res, next) {
        try {
            let data = req.body;
            let available = await getOtherTax(parseInt(data.id));
            if(available == null){
                let response = ApiResponse.successResponse(res, "Sorry, We are not able to find the record");
                return response;
            }
            let updatedTaxDetails = JSON.parse(available.tax_details).map((tax) => {
                if (tax.id === data.tax_details_config) {
                    tax.is_active = 1;
                }
                return tax;
            });
            let tax_details = JSON.stringify(updatedTaxDetails);
            let result = await updateTaxDetailsx(parseInt(data.id), { tax_details: [tax_details] });
            return ApiResponse.successResponseWithData(res, "Successfully delete the record", result);
        } catch (error) {
            logger.error(`Error in othertaxController/deleteSingleTaxDetails: ${error}`);
            return ApiResponse.ErrorResponse(res, "Can't delete the record", error);
        }
    }


}