"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
var LocalStrategy = require("passport-local").Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../database');
class UsersController {
    //allrecords
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query('SELECT * FROM users');
            res.json(users);
        });
    }
    //getone
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const users = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
            //console.log(users.length);
            if (users.length > 0) {
                return res.json(users[0]);
                //console.log(res);
            }
            res.status(404).json({ text: "The user doesn't exits" });
        });
    }
    //getone
    validate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, username, password } = req.params;
            const users = yield database_1.default.query('SELECT * FROM users WHERE id = ?', [id]);
            //console.log(users.length);
            if (users.length > 0) {
                return res.json(users[0]);
                //console.log(res);
            }
            res.status(404).json({ text: "The user doesn't exits" });
        });
    }
    provaAlex() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Holas");
        });
    }
    //create
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO users set ?', [req.body]);
            res.json({ message: 'User Saved' });
        });
    }
    //delete
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM users WHERE id = ?', [id]);
            res.json({ message: "The user was deleted" });
        });
    }
}
const usersController = new UsersController;
exports.default = usersController;
