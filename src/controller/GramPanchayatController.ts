
import { createGramPanchayat, deleteGramPanchayat, findGramPanchayat, getAllGrampanchayat, getAllTalukaByDistrict, getGramPanchayat, getGramPanchayatCount, updateGramPanchayat } from '../models/GramPanchayat';
import { ApiResponse } from '../utils/ApiResponse';
export class GramPanchayatController {

   static async createGramPanchayat(req, res, next) {
        try {
            let { name, district_id, taluka_id } = req.body;
            let params = {
                d_id: district_id,
                t_id: taluka_id,
                searchText: name
            }
            let availableGramPanchayat = await findGramPanchayat(params);
            if(availableGramPanchayat.length > 0){
                let response = ApiResponse.successResponse(res, name+ " GramPanchayat already exists");
                return response;
            }
            let grampanchayat: any = await createGramPanchayat(name, district_id, taluka_id);
            let response = ApiResponse.successResponse(res, grampanchayat.name + " GramPanchayat created successfully");
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to create GramPanchayat", error);
            return response;
        }
    }

    static async getAllGramPanchayat(req, res, next) {
        try {
             let offset:number = parseInt(process.env.PAGE_OFFSET) || 0;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body?.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }
            let gram_panchayat = await getAllGrampanchayat(params);
            let totalCount = (searchText == '') ? await getGramPanchayatCount() : Object.keys(gram_panchayat).length;
            let response = ApiResponse.successResponseWithData(res, "GramPanchayat fetched successfully", { gram_panchayat, totalCount: totalCount });
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch GramPanchayat", error);
            return response;
        }
    }

    static async getGramPanchayat(req, res, next) {
        try {
            let data = req.body;
            let gram_panchayat = await getGramPanchayat(parseInt(data.id));
            if(gram_panchayat == null){
                let response = ApiResponse.successResponseWithData(res, "GramPanchayat not found", []);
                return response;
            }
            let response = ApiResponse.successResponseWithData(res, "GramPanchayat fetched successfully", gram_panchayat);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch GramPanchayat", error);
            return response;
        }
    }

    static async updateGramPanchayat(req, res, next) {
        try {
            let data = req.body;
            let gram_panchayat = await updateGramPanchayat(parseInt(data.id), { name: data.name, district_id: data.district_id, taluka_id: data.taluka_id });
            let response = ApiResponse.successResponseWithData(res, "GramPanchayat updated successfully", gram_panchayat);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to update GramPanchayat", error);
            return response;
        }
    }

    static async deleteGramPanchayat(req, res, next) {
        try {
            let data = req.body;
            let exists_gram_panchayat = await getGramPanchayat(parseInt(data.id));
            if(exists_gram_panchayat == null){
                let response = ApiResponse.successResponse(res, "Sorry we'r unable to find this GramPanchayat for delete operation");
                return response;
            }
            let gram_panchayat = await deleteGramPanchayat(parseInt(data.id));
            let response = ApiResponse.successResponseWithData(res, "GramPanchayat deleted successfully", gram_panchayat);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to delete GramPanchayat", error);
            return response;
        }
    }

    static async GetTalukaListByDistrictId(req, res, next) {
        try {
            let data = req.body;
            let taluka = await getAllTalukaByDistrict(parseInt(data.district_id));
            let response = ApiResponse.successResponseWithData(res, "Taluka fetched successfully", taluka);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Taluka", error);
            return response;
        }
    }


}