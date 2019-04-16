"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', usersController_1.default.getAll);
        this.router.get('/:id', usersController_1.default.getOne);
        this.router.post('/', usersController_1.default.validate);
        //this.router.post('/', usersController.create);
        //this.router.post('/', usersController.provaAlex);
        this.router.delete('/:id', usersController_1.default.delete);
    }
}
exports.default = new UserRoutes().router;
