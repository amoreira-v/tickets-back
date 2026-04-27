"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const TicketService_1 = require("../services/TicketService");
const catchAsync_1 = require("../utils/catchAsync");
const ticketService = new TicketService_1.TicketService();
class TicketController {
    constructor() {
        this.getAll = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const tickets = await ticketService.getAllTickets();
            return res.status(200).json({
                status: 'success',
                data: tickets
            });
        });
        this.create = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const newTicket = await ticketService.createTicket(req.body, req.user);
            return res.status(201).json({
                status: 'success',
                data: newTicket
            });
        });
        this.updateStatus = (0, catchAsync_1.catchAsync)(async (req, res) => {
            const id = req.params.id;
            const updatedData = await ticketService.updateTicketStatus(id, req.body, req.user);
            return res.status(200).json({
                status: 'success',
                data: updatedData
            });
        });
    }
}
exports.TicketController = TicketController;
