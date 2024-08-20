
export class ApiResponse {

    static successResponse(res, msg: string) {
        var data = {
            status: 200,
            message: msg
        };
        return res.status(200).json(data);

    }

    static successResponseWithData(res, msg, data) {
        var resData = {
            code: 200,
            message: msg,
            data: data
        };
        return res.status(200).json(resData);
    }
    static responseResult(res, data) {
        var resData = {
            code: 200,
            data: data
        };
        return res.status(200).json(resData);
    }


    static ErrorResponse = function (res, msg, status = 500) {
        var data = {
            status: status,
            message: msg,
        };
        return res.status(status).json(data);
    };

    static notFoundResponse = function (res, msg) {
        var data = {
            status: 404,
            message: msg,
        };
        return res.status(404).json(data);
    };

    static validationErrorWithData = function (res, msg, data) {
        var resData = {
            status: 400,
            message: msg,
            data: data
        };
        return res.status(400).json(resData);
    };

    static unauthorizedResponse = function (res, msg, status = 401) {

        var data = {
            status: status,
            message: msg,
        };
        return res.status(status).json(data);
    };

    static tokenExpiredResponse = function (res, msg) {
        var data = {
            status: 408,
            message: msg,
        };
        return res.status(408).json(data);
    }

}