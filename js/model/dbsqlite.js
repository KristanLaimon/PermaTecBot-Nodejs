"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const dbjson_1 = __importDefault(require("./dbjson"));
class DbSqlite {
    static get Db() {
        if (this._db === undefined) {
            this._db = new better_sqlite3_1.default(dbjson_1.default.readConfigJson().DatabasePath);
        }
        return this._db;
    }
    static set Db(newDb) {
        this._db = newDb;
    }
    static Query(sqlQuery) {
        return this.Db.prepare(sqlQuery);
    }
    static QueryAll(sqlQuery) {
        return this.Db.prepare(sqlQuery).all();
    }
    static QueryWithParams(sqlQuery, params) {
        return this.Db.prepare(sqlQuery).get(params);
    }
    static QueryWithParamsAll(sqlQuery, params) {
        return this.Db.prepare(sqlQuery).all(params);
    }
    static ExecWithParams(sqlQuery, params) {
        let result = this.Db.prepare(sqlQuery).run(params);
        return result.changes;
    }
}
exports.default = DbSqlite;
//# sourceMappingURL=dbsqlite.js.map