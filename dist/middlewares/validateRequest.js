"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const CustomError_1 = require("../utils/CustomError");
function validateRequest(type) {
    return async (req, res, next) => {
        const obj = (0, class_transformer_1.plainToInstance)(type, req.body);
        const errors = await (0, class_validator_1.validate)(obj);
        if (errors.length > 0) {
            const formattedErrors = errors.map(err => ({
                property: err.property,
                constraints: err.constraints
            }));
            return next(new CustomError_1.CustomError('Error de validacion en la solicitud', 400, formattedErrors));
        }
        req.body = obj;
        next();
    };
}
