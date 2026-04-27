"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProfileController_1 = require("../controllers/ProfileController");
const validateRequest_1 = require("../middlewares/validateRequest");
const role_middleware_1 = require("../middlewares/role.middleware");
const admin_dto_1 = require("../dtos/admin.dto");
const router = (0, express_1.Router)();
const controller = new ProfileController_1.ProfileController();
// Rutas de lectura (Todos los autenticados)
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
// Rutas de escritura (Solo ADMIN)
router.post('/', (0, role_middleware_1.requireRole)('ADMIN'), (0, validateRequest_1.validateRequest)(admin_dto_1.CreateProfileDto), controller.create);
router.patch('/:id', (0, role_middleware_1.requireRole)('ADMIN'), (0, validateRequest_1.validateRequest)(admin_dto_1.UpdateProfileDto), controller.update);
router.delete('/:id', (0, role_middleware_1.requireRole)('ADMIN'), controller.delete);
exports.default = router;
