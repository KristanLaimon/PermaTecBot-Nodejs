"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
class StringUtils {
    static capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
}
exports.StringUtils = StringUtils;
/** Manages all JSON and SQLITE data stroring (Needs refactoring maybe) */
//# sourceMappingURL=string_utils.js.map