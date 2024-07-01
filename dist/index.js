"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.app = void 0;
// @ts-ignore
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
exports.app = app;
const PORT = process.env.PORT || 4000;
exports.PORT = PORT;
app.use(express_1.default.static('public'));
app.get('/artist/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const response = yield axios_1.default.get(`https://musicbrainz.org/ws/2/artist/`, {
            params: {
                query: name,
                fmt: 'json'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetching artist details:', error.message);
        res.status(500).send({ error: 'An error occurred while fetching artist details.' });
    }
}));
app.get('/artist/:id/albums', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield axios_1.default.get(`https://musicbrainz.org/ws/2/release-group`, {
            params: {
                artist: id,
                type: 'album|single',
                fmt: 'json'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetching artist albums:', error.message);
        res.status(500).send({ error: 'An error occurred while fetching artist albums.' });
    }
}));
app.get('/artist/:id/releases', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield axios_1.default.get(`https://musicbrainz.org/ws/2/release`, {
            params: {
                artist: id,
                fmt: 'json'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetching artist releases:', error.message);
        res.status(500).send({ error: 'An error occurred while fetching artist releases.' });
    }
}));
app.get('/album/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield axios_1.default.get(`https://musicbrainz.org/ws/2/release-group/${id}`, {
            params: {
                fmt: 'json'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetching album details:', error.message);
        res.status(500).send({ error: 'An error occurred while fetching album details.' });
    }
}));
app.get('/album/:id/recordings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield axios_1.default.get(`https://musicbrainz.org/ws/2/recording`, {
            params: {
                release: id,
                fmt: 'json'
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error fetching album recordings:', error.message);
        res.status(500).send({ error: 'An error occurred while fetching album recordings.' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
