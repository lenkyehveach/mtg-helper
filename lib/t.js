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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getFullSet = exports.getCards = void 0;
var getCards = function (set, n) { return __awaiter(void 0, void 0, void 0, function () {
    var res, cards, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://api.magicthegathering.io/v1/cards?set=".concat(set, "&page=").concat(n.toString()))];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                cards = (_a.sent()).cards;
                data = cards.map(function (card) {
                    return {
                        id: card.id,
                        name: card.name,
                        manaCost: card.manaCost != undefined ? card.manaCost : null,
                        cmc: card.cmc,
                        colors: card.colors,
                        colorIdentity: card.colorIdentity,
                        types: card.types,
                        imageUrl: card.imageUrl != undefined ? card.imageUrl : null,
                        variations: card.variations != undefined ? card.variations : null
                    };
                });
                return [2 /*return*/, data];
        }
    });
}); };
exports.getCards = getCards;
var getFullSet = function () { return __awaiter(void 0, void 0, void 0, function () {
    var fullSet, done, i, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fullSet = [];
                done = false;
                i = 0;
                _a.label = 1;
            case 1:
                if (!!done) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.getCards)("NEO", i + 1)];
            case 2:
                data = _a.sent();
                if (data.length == 0) {
                    done = true;
                    return [3 /*break*/, 3];
                }
                fullSet.concat(data);
                i++;
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/, fullSet];
        }
    });
}); };
exports.getFullSet = getFullSet;
var fs = await (0, exports.getFullSet)();
console.table(fs);
