"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = exports.TicketStatus = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Comment_1 = require("./Comment");
const Assignment_1 = require("./Assignment");
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "OPEN";
    TicketStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TicketStatus["RESOLVED"] = "RESOLVED";
    TicketStatus["REJECTED"] = "REJECTED";
})(TicketStatus || (exports.TicketStatus = TicketStatus = {}));
let Ticket = class Ticket {
};
exports.Ticket = Ticket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Ticket.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: TicketStatus.OPEN
    }),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", User_1.User)
], Ticket.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assigned_to' }),
    __metadata("design:type", Object)
], Ticket.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, (comment) => comment.ticket),
    __metadata("design:type", Array)
], Ticket.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Assignment_1.Assignment, (assignment) => assignment.ticket),
    __metadata("design:type", Array)
], Ticket.prototype, "assignments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Ticket.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Ticket.prototype, "updatedAt", void 0);
exports.Ticket = Ticket = __decorate([
    (0, typeorm_1.Entity)('tickets')
], Ticket);
