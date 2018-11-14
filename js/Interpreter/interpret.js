/**
 
 @author     :   Noman^Alien#0637
 @created_On :   11/13/2018 ; 1:58 PM
 
 */


function interpret(code) {
    // generateTokens the code and create tokens
    let tokensArrays = generateTokens(code);
    
    console.table(tokensArrays);
    
    // output string
    let output = '';
    
    for (let tokensArray in tokensArrays) {
        // noinspection JSUnfilteredForInLoop
        output += parse(tokensArrays[tokensArray]) + '&#010;';
    }
    
    return output;
    
}

function generateTokens(code) {
    // replace all the inner extra whitespace, tabs and line breaks
    // split with ; statement termination
    code = code.replace(/\s\s+/g, ' ').split(';');
    
    // trim all the whitespace from both sides
    for (let i = 0; i < code.length; i++) {
        code[i] = code[i].trim();
    }
    
    // filtering by non empty string
    function nonEmptyString(str) {
        return str.length > 0;
    }
    
    // new function filter - a good one
    code = code.filter(nonEmptyString);
    let tokensArrays = [];
    for (let i = 0; i < code.length; i++) {
        tokensArrays[i] = code[i].split(' ');
    }
    
    return tokensArrays;
    
}

function parse(tokensArray) {
    let stackHit = false;           // fixme there should be no stack hit variable once func syntax is parsed
    for (let i = tokensArray.length - 1; i >= 0; i--, stackHit = false) {
        
        console.log(`Current Index: ${i}`);
        
        let token = tokensArray[i];
        
        console.log(`token: ${token}`);
        
        // check if the token is a real number
        if (!isNaN(token)) {
            
            console.log('Number hit');
            stackHit = true;
            
            tokensArray[i] = Number(token);
        } else {
            
            // it can be a function
            for (let module in modulesInScope) {
                let func = modulesInScope[module][token];
                if (func != null) {
                    
                    console.log(`Func Hit: ${func}`);
                    stackHit = true;
                    
                    // its a function call
                    let funcCallArgs = tokensArray.slice(i + 1, i + 1 + func.argsNeed);   // func args
                    console.table(funcCallArgs);
                    let parsedValue = func.call(funcCallArgs);                   // return value after func call
                    console.log("Parsed Value: " + parsedValue.toString());
                    tokensArray = unify(tokensArray, i, parsedValue, func.argsNeed);
                    // carry on
                    break;
                }
                
            }
            
            // if there was a hit then continue
            if (stackHit) continue;
            
            // after not being a function
            // it must be a new var with str just in front of it
            // so look ahead for str
            if (tokensArray[i - 1] === 'str') {
                
                console.log(`Hit Str`);
                i--;
                
                let func = modulesInScope['base']['str'];
                let funcCallArgs = tokensArray.slice(i + 1, i + 1 + func.argsNeed);
                let parsedValue = func.call(funcCallArgs);
                console.log("Parsed Value: " + parsedValue.toString());
                tokensArray = unify(tokensArray, i, parsedValue, func.argsNeed);
                
                console.table(variables);
            }
            // its a variable or a function
            // checking in variables stack
            else if (variables[token] != null) {
                // its a variable hit
                // parse it into a number,
                // because variables cannot store anything
                // except numbers
                
                console.log('Variable Hit');
                stackHit = true;
                tokensArray[i] = Number(variables[token]);
            }
            
            // or its an error
            else {
                // stop parsing
                i = -1;
                tokensArray[0] = token + ' is not a valid literal'
            }
            
            
        }
        
        console.table(tokensArray);
    }
    
    return tokensArray[0].toString();
    
}

function unify(tokensArray, i, parsedValue, args) {
    let firstPart = tokensArray.slice(0, i);
    firstPart.push(parsedValue);
    let lastPart = tokensArray.slice(i + 1 + args);
    return firstPart.concat(lastPart);
}