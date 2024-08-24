
import { createGatGramPanchayat, deleteGatGramPanchayat, findGatGramPanchayat, getAllGatGrampanchayat, getAllGrampanchayatByTalukaId, getGatGramPanchayat, getGatGramPanchayatCount, updateGatGramPanchayat } from '../models/GatGramPanchayat';
import { createGramPanchayat, deleteGramPanchayat, findGramPanchayat, getAllGrampanchayat, getAllTalukaByDistrict, getGramPanchayat, getGramPanchayatCount, updateGramPanchayat } from '../models/GramPanchayat';
import { createTaluka, deleteTaluka, getAllTalukas, getTaluka, getTalukaCount, updateTaluka } from '../models/Taluka';
import { ApiResponse } from '../utils/ApiResponse';
export class GatGramPanchayatController {

   static async createGatGramPanchayat(req, res, next) {
        try {
            let { name, district_id, taluka_id, grampanchayat_id } = req.body;
            let params = {
                d_id: district_id,
                t_id: taluka_id,
                g_id: grampanchayat_id,
                searchText: name
            }
            let availablegatGramPanchayat = await findGatGramPanchayat(params);
            if(availablegatGramPanchayat.length > 0){
                let response = ApiResponse.successResponse(res, name+ " गटग्रामपंचायत आधीच अस्तित्वात आहे");
                return response;
            }
            let gatgrampanchayat: any = await createGatGramPanchayat(name, district_id, taluka_id, grampanchayat_id);
            let response = ApiResponse.successResponse(res, gatgrampanchayat.name + " गटग्रामपंचायत यशस्वीरित्या तयार केली");
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "गटग्रामपंचायत निर्माण करण्यात अयशस्वी", error);
            return response;
        }
    }

    static async getAllGatGramPanchayat(req, res, next) {
        try {
             let offset:number = parseInt(process.env.PAGE_OFFSET) || 0;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body?.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }
            let gat_gram_panchayat = await getAllGatGrampanchayat(params);
            let totalCount = (searchText == '') ? await getGatGramPanchayatCount() : Object.keys(gat_gram_panchayat).length;
            let response = ApiResponse.successResponseWithData(res, "गटग्रामपंचायत यशस्वीरित्या आणली", { gat_gram_panchayat, totalCount: totalCount });
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "गटग्रामपंचायत आणण्यात अयशस्वी", error);
            return response;
        }
    }

    static async getGatGramPanchayat(req, res, next) {
        try {
            let data = req.body;
            let gat_gram_panchayat = await getGatGramPanchayat(parseInt(data.id));
            if(gat_gram_panchayat == null){
                let response = ApiResponse.successResponseWithData(res, "गटग्रामपंचायत सापडली नाही", []);
                return response;
            }
            let response = ApiResponse.successResponseWithData(res, "गटग्रामपंचायत यशस्वीरित्या आणली", gat_gram_panchayat);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "गटग्रामपंचायत आणण्यात अयशस्वी", error);
            return response;
        }
    }

    static async updateGatGramPanchayat(req, res, next) {
        try {
            let data = req.body;
            let gat_gram_panchayat = await updateGatGramPanchayat(parseInt(data.id), { name: data.name, district_id: data.district_id, taluka_id: data.taluka_id, grampanchayat_id: data.grampanchayat_id });
            let response = ApiResponse.successResponseWithData(res, "गटग्रामपंचायत यशस्वीरित्या अद्यतनित", gat_gram_panchayat);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "गटग्रामपंचायत अपडेट करण्यात अयशस्वी", error);
            return response;
        }
    }

    static async deleteGatGramPanchayat(req, res, next) {
        try {
            let data = req.body;
            let exists_gat_gram_panchayat = await getGatGramPanchayat(parseInt(data.id));
            if(exists_gat_gram_panchayat == null){
                let response = ApiResponse.successResponse(res, "क्षमस्व, आम्ही हटवण्याच्या ऑपरेशनसाठी ही गटग्रामपंचायत शोधण्यात अक्षम आहोत");
                return response;
            }
            let gram_panchayat = await deleteGatGramPanchayat(parseInt(data.id));
            let response = ApiResponse.successResponseWithData(res, "गटग्रामपंचायत यशस्वीरित्या हटवली", gram_panchayat);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "गटग्रामपंचायत हटविण्यात अयशस्वी", error);
            return response;
        }
    }

    static async getGrampanchayatByTalikaId(req, res, next) {
        try {
            let data = req.body;
            let taluka = await getAllGrampanchayatByTalukaId(parseInt(data.taluka_id));
            let response = ApiResponse.successResponseWithData(res, "ग्रामपंचायत यशस्वीरित्या आणली", taluka);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "ग्रामपंचायत आणण्यात अयशस्वी", error);
            return response;
        }
    }


}