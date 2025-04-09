"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaPagination = void 0;
/**
 * Pagination meta data
 * @param data
 * @return
 */
const metaPagination = (data) => {
    return {
        currentPage: data._currentPage,
        totalPage: data._lastPage,
        totalItems: data._total,
    };
};
exports.metaPagination = metaPagination;
