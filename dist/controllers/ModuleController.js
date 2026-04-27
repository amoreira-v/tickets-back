"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleController = void 0;
const ModuleService_1 = require("../services/ModuleService");
const catchAsync_1 = require("../utils/catchAsync");
const moduleService = new ModuleService_1.ModuleService();
class ModuleController {
    constructor() {
        this.getAll = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const modules = await moduleService.findAll();
            return res.status(200).json({ status: 'success', data: modules });
        });
        this.getById = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const moduleItem = await moduleService.findById(req.params.id);
            return res.status(200).json({ status: 'success', data: moduleItem });
        });
        this.create = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const moduleItem = await moduleService.create(req.body);
            return res.status(201).json({ status: 'success', data: moduleItem });
        });
        this.update = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const moduleItem = await moduleService.update(req.params.id, req.body);
            return res.status(200).json({ status: 'success', data: moduleItem });
        });
        this.delete = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const result = await moduleService.delete(req.params.id);
            return res.status(200).json({ status: 'success', data: result });
        });
    }
}
exports.ModuleController = ModuleController;
