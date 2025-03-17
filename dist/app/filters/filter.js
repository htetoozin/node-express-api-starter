"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Filter {
    constructor(values) {
        this.filterValues = [];
        this.values = values;
    }
    apply(builder) {
        this.builder = builder;
        for (const [filter, value] of Object.entries(this.getFilters())) {
            if (typeof this[filter] === "function") {
                this[filter](value);
            }
        }
        return this.builder;
    }
    getFilters() {
        return Object.fromEntries(Object.entries(this.values)
            .filter(([key]) => this.filterValues.includes(key))
            .filter(([_, value]) => value !== undefined && value !== "" && value !== null));
    }
}
exports.default = Filter;
