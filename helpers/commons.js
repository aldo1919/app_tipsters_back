const typeOf = (x) => {
    if (x === null) {
        return 'null';
    }

    switch (typeof x) {
        case "undefined":
            return "undefined";
        case "boolean":
            return "boolean";
        case "number":
            return "number";
        case "string":
            return "string";
        default:
            if (Array.isArray(x)) return "array";
            return "object";
    }
}

module.exports = {
    typeOf
}
