import { Request, Response } from 'express';
import pool from '../database';

var LocalStrategy = require("passport-local").Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(pool);

class UsersController {

    //allrecords
    public async list(req: Request, res: Response): Promise<void> {
        const users = await pool.query('SELECT * FROM users');
        res.json(users);
    }

    //getone
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const users = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        //console.log(users.length);
        if (users.length > 0) {
            return res.json(users[0]);
        }
        res.status(404).json({ text: "The user doesn't exits" });
    }

    //create
    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO users set ?', [req.body]);
        res.json({ message: 'User Saved' });
    }

    //delete
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: "The user was deleted" });
    }

}

const usersController = new UsersController;
export default usersController;