"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validateRequest(type) {
    return async (req, res, next) => {
        const obj = (0, class_transformer_1.plainToInstance)(type, req.body);
        const errors = await (0, class_validator_1.validate)(obj);
        if (errors.length > 0) {
            const formattedErrors = errors.map(err => ({
                property: err.property,
                constraints: err.constraints
            }));
            return res.status(400).json({
                status: 'error',
                data: formattedErrors
            });
        }
        req.body = obj;
        next();
    };
}
