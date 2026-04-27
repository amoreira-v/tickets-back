"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const ProfileService_1 = require("../services/ProfileService");
const catchAsync_1 = require("../utils/catchAsync");
const profileService = new ProfileService_1.ProfileService();
class ProfileController {
    constructor() {
        this.getAll = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const profiles = await profileService.findAll();
            return res.status(200).json({ status: 'success', data: profiles });
        });
        this.getById = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const profile = await profileService.findById(req.params.id);
            return res.status(200).json({ status: 'success', data: profile });
        });
        this.create = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const profile = await profileService.create(req.body);
            return res.status(201).json({ status: 'success', data: profile });
        });
        this.update = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const profile = await profileService.update(req.params.id, req.body);
            return res.status(200).json({ status: 'success', data: profile });
        });
        this.delete = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const result = await profileService.delete(req.params.id);
            return res.status(200).json({ status: 'success', data: result });
        });
    }
}
exports.ProfileController = ProfileController;
