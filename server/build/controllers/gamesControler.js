"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class gamesController {
    index(req, res) {
        res.json({ text: 'API is in /api/games' });
    }
}
exports.gamesController = new gamesController;
