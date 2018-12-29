/**
 
 @author     :   Noman^Alien#0637
 @created_On :   11/13/2018 ; 4:17 PM
 
 */

/*
 * ================================Functions====================================
 */

const add = {
    argsNeed: 2,
    call(args) {
        console.table(args);
        return args[0] + args[1];
    }
};

const sub = {
    argsNeed: 2,
    call(args) {
        console.table(args);
        return args[0] - args[1];
    }
};


const mul = {
    argsNeed: 2,
    call(args) {
        console.table(args);
        return args[0] * args[1];
    }
};


const div = {
    argsNeed: 2,
    call(args) {
        console.table(args);
        return args[0] / args[1];
    }
};



/*
 * ================================Basic Utilities====================================
 */

const str = {
    argsNeed: 2,
    call(args) {
        console.table(args);
        variables[args[0]] = args[1];
        return args[1];
    }
};

/*-------------------- Function Index -------------------*/
const base = {

    /*-------------------- Basic Math -------------------*/
    'add': add,
    'sub': sub,
    'mul': mul,
    'div': div,

    /*-------------------- Basic Utility -------------------*/
    'str': str
};