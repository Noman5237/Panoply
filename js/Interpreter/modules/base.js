

const base ={
    "add": add
};

/*
 * ================================Functions====================================
 */

const add = {
    argsNeed: 2,
    call(args) {
        return args[0] + args[1];
    }
};