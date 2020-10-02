class Flags {
    constructor(args, options) {
        this.args = args;
        this.options = options;
    }
    getObj() {
        let flagMatch = /--[^ ]+=\((.*)\)/;
        let flags = this.args.filter(arg => {
            return arg.match(flagMatch)
        });
        let flagObj = {};
        const flagObjAr = flags.map((str) => {
            const [_, key, value] = str.match(/^--(.+)=\((.*)\)/);
            return {[key]: value};

        });

        flagObjAr.forEach(pair => {
            flagObj[Object.keys(pair)[0]] = Object.values(pair)[0];
        });
        return flagObj;
    }
    getArray() {
        let flagMatch = /--[^ ]+=\((.*)\)/;
        let flags = this.args.filter(arg => {
            return arg.match(flagMatch)
        });
        let flagObj = {};
        const flagObjAr = flags.map((str) => {
            const [_, key, value] = str.match(/^--(.+)=\((.*)\)/);
            return {[key]: value};

        });
        return flagObjAr;
    }
}
module.exports = {Flags}
