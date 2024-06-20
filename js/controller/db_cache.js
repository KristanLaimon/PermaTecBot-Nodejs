"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Model Layer
const dbjson_1 = __importDefault(require("../model/dbjson"));
const dbsqlite_1 = __importDefault(require("../model/dbsqlite"));
class DbCache {
    static get DbImages() {
        if (!this._dbImages) {
            this._dbImages = getImgFromDb();
        }
        return this._dbImages;
    }
    static get DbPubs() {
        if (!this._dbPublications) {
            this._dbPublications = getPubsFromDb();
        }
        return this._dbPublications;
    }
    static get Config() {
        if (!this._jsonConfig) {
            this._jsonConfig = dbjson_1.default.readConfigJson();
        }
        return this._jsonConfig;
    }
    static refreshCache() {
        this._dbImages = getImgFromDb();
        this._dbPublications = getPubsFromDb();
        this._jsonConfig = dbjson_1.default.readConfigJson();
    }
}
exports.default = DbCache;
//Private functions of this module
function getImgFromDb() {
    return dbsqlite_1.default.QueryAll("SELECT * FROM Image;");
}
function getPubsFromDb() {
    return dbsqlite_1.default.QueryAll("SELECT * FROM Publication");
}
//# sourceMappingURL=db_cache.js.map