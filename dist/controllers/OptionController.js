"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionController = void 0;
const OptionService_1 = require("../services/OptionService");
const catchAsync_1 = require("../utils/catchAsync");
const optionService = new OptionService_1.OptionService();
class OptionController {
    constructor() {
        this.getAll = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const options = await optionService.findAll();
            return res.status(200).json({ status: 'success', data: options });
        });
        this.getById = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const option = await optionService.findById(req.params.id);
            return res.status(200).json({ status: 'success', data: option });
        });
        this.create = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const option = await optionService.create(req.body);
            return res.status(201).json({ status: 'success', data: option });
        });
        this.update = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const option = await optionService.update(req.params.id, req.body);
            return res.status(200).json({ status: 'success', data: option });
        });
        this.delete = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const result = await optionService.delete(req.params.id);
            return res.status(200).json({ status: 'success', data: result });
        });
    }
}
exports.OptionController = OptionController;
