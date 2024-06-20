"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Delegate {
    constructor() {
        this._insideFuncts = [];
    }
    add(...functs) {
        this._insideFuncts.push(...functs);
    }
    invoke(...params) {
        this._insideFuncts.forEach(funct => funct(...params));
    }
}
exports.default = Delegate;
//# sourceMappingURL=delegate.js.map