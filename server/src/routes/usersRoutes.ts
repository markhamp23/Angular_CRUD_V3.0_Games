import express, { Router } from 'express';

import usersController from '../controllers/usersController';

class UserRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        //this.router.get('/', usersController.getAll);
        //this.router.get('/:id', usersController.getOne);
        this.router.post('/', usersController.validate);
        //this.router.post('/', usersController.create);
        //this.router.post('/', usersController.provaAlex);
        //this.router.delete('/:id', usersController.delete);
    }
}

export default new UserRoutes().router;

