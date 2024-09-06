
import { Logger } from '../logger/Logger';
import { createAnnualTax, deleteAnnualTax, deleteAnnualTaxRates, findAnnualTax, getAllAnnualTax, getAnnualTax, getAnnualTaxCount, getAnnualTaxRate, updateAnnualTax } from '../models/AnnualTax';
import { ApiResponse } from '../utils/ApiResponse';
const logger = new Logger().logger;

export class AnnualTaxController {

   static async createAnnualTax(req, res, next) {
        try {
            let { district_id, taluka_id, grampanchayat_id, gat_grampanchayat_id,malmatteche_prakar_id,malmatteche_varnan_id,annual_rate,aakarani_dar } = req.body;
          
            let params = {
                d_id: district_id,
                t_id: taluka_id,
                g_id: grampanchayat_id,
                gat_gid:gat_grampanchayat_id,
                m_p_id: malmatteche_prakar_id,
                m_v_id:malmatteche_varnan_id,
                anu_rate:annual_rate,
                aakrni_dar:aakarani_dar
            }
            let available = await findAnnualTax(params);
            if(available.length > 0){
               return ApiResponse.successResponse(res, "Annual tax is already exist");    
            }
            await createAnnualTax(district_id, taluka_id, grampanchayat_id, gat_grampanchayat_id, malmatteche_prakar_id,malmatteche_varnan_id,annual_rate,aakarani_dar);
            return ApiResponse.successResponse(res, "Annual tax is created successfully");
            
        } catch (error) {
            logger.error(`Error in AnnualTaxController/createAnnualTax: ${error}`);
            return ApiResponse.ErrorResponse(res, "Failed to create Annual tax", error);
        }
    }

    static async getAllAnnualTax(req, res, next) {
        try {
             let offset:number = parseInt(process.env.PAGE_OFFSET) || 0;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body?.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }
            let result = await getAllAnnualTax(params);
            let totalCount = (searchText == '') ? await getAnnualTaxCount() : Object.keys(result).length;
            return ApiResponse.successResponseWithData(res, "All Annual tax fetched Successfully", { result, totalCount: totalCount });
             
        } catch (error) {
             logger.error(`Error in AnnualTaxController/getAllAnnualTax: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch annual tax details", error);
            return response;
        }
    }

    static async getAnnualTax(req, res, next) {
        try {
            let result = await getAnnualTax(parseInt(req.params.id));
            if(result == null){
                return ApiResponse.successResponseWithData(res, "No Annual tax details found", []);
            }
            return ApiResponse.successResponseWithData(res, "Annual tax fetched successfully", result);
        } catch (error) {
            logger.error(`Error in AnnualTaxController/getAnnualTax: ${error}`);
            return ApiResponse.ErrorResponse(res, "Failed to fetch annual tax details", error);
        }
    }

    static async updateAnnualTax(req, res, next) {
        try {
            let data = req.body;
            let result = await updateAnnualTax(parseInt(data.id), {annual_rate: data.annual_rate, aakarani_dar: data.aakarani_dar });
            return ApiResponse.successResponseWithData(res, "Update annual tax rates successfully", result);
        } catch (error) {
            logger.error(`Error in AnnualTaxController/updateAnnualTax: ${error}`);
            return ApiResponse.ErrorResponse(res, "Failed to update annual tax details", error);
        }
    }

    static async deleteCompleteAnnualTax(req, res, next) {
        try {
            let available = await getAnnualTax(parseInt(req.params.id));
            if(available == null){
                return ApiResponse.successResponse(res, "Sorry, We are not able to find the record");
            }
            let result = await deleteAnnualTax(parseInt(req.params.id));
            return ApiResponse.successResponseWithData(res, "Successfully delete the record", result);
        } catch (error) {
            logger.error(`Error in AnnualTaxController/deleteCompleteAnnualTax: ${error}`);
            return ApiResponse.ErrorResponse(res, "Can't delete the record", error);
        }
    }

     static async deleteSingleAnnualTaxRates(req, res, next) {
        try {
            let available = await getAnnualTaxRate(parseInt(req.params.id));
            if(available == null){
                return ApiResponse.successResponse(res, "Sorry, We are not able to find the record");
            }
            let result = await deleteAnnualTaxRates(parseInt(req.params.id));
            return ApiResponse.successResponseWithData(res, "Successfully delete the record", result);
        } catch (error) {
            logger.error(`Error in AnnualTaxController/deleteCompleteAnnualTax: ${error}`);
            return ApiResponse.ErrorResponse(res, "Can't delete the record", error);
        }
    }


}