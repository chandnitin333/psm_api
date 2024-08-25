import { Logger } from '../logger/Logger';
import { createFloor, deleteFloor, findFloor, getAllFloors, getFloor, getFloorCount, updateFloor } from '../models/Floor';
import { ApiResponse } from '../utils/ApiResponse';
const logger = new Logger().logger;
export class FloorController {
    static async createFloor(req, res, next) {
        try {
            let { floor_name } = req.body;
             let params = {
                searchText: floor_name
            }
            let avialableFloor = await findFloor(params);
            if(avialableFloor.length == 0){
                let floor: any = await createFloor(floor_name);
                return ApiResponse.successResponse(res, floor.floor_name+" created successfully");
            }else{
                return ApiResponse.successResponse(res, floor_name+" alraedy exist");
            }
        } catch (error) {
            logger.error(`Error in FloorController/createFloor: ${error}`);
            return ApiResponse.ErrorResponse(res, "Failed to create floor", error);
        }
    }

    static async getAllFloors(req, res, next) {
        try {
            let offset:number = parseInt(process.env.PAGE_OFFSET) || 0;
            let pageNumber = (req.body?.pageNumber ?? 1) - 1;
            let searchText = req.body?.searchText ?? "";
            let limit = (pageNumber != 0) ? pageNumber * offset : pageNumber;

            let params = {
                pageNumber: limit,
                searchText: searchText
            }

            let floors = await getAllFloors(params);
            let totalCount = (searchText == '') ? await getFloorCount() : Object.keys(floors).length;
            let response = ApiResponse.successResponseWithData(res, "Floor fetched successfully", {floors, totalCount: totalCount});
            return response;
        } catch (error) {
            logger.error(`Error in FloorController/getAllFloors: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Floor", error);
            return response;
        }
    }

    static async getFloor(req, res, next) {
        try {
            let floor = await getFloor(parseInt(req.params.floor_id));
            if(floor == null){
                let response = ApiResponse.successResponseWithData(res, "Floor not found", []);
                return response;
            }
            let response = ApiResponse.successResponseWithData(res, "Floor fetched successfully", floor);
            return response;
        } catch (error) {
            logger.error(`Error in FloorController/getFloor: ${error}`);
            let response = ApiResponse.ErrorResponse(res, "Failed to fetch Floor", error);
            return response;
        }
    }

    static async updateFloor(req, res, next) {
        try {
            let data = req.body;
            let avialableFloor = await findFloor({ searchText: data.floor_name });
            if (avialableFloor.length > 0) {
                return ApiResponse.ErrorResponse(res, "Floor name already exists");
            }
            let floor = await updateFloor(parseInt(data.id), { floor_name: data.floor_name });
            let response = ApiResponse.successResponseWithData(res, "Floor updated successfully", floor);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to update Floor", error);
            return response;
        }
    }

    static async deleteFloor(req, res, next) {
        try {
            let user = await deleteFloor(parseInt(req.params.floor_id));
            let response = ApiResponse.successResponseWithData(res, "Floor deleted successfully", user);
            return response;
        } catch (error) {
            let response = ApiResponse.ErrorResponse(res, "Failed to delete floor", error);
            return response;
        }
    }
}