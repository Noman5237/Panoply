let mainOutput = '';

// src code
let src = document.getElementById('srcCode');
window.addEventListener('DOMContentLoaded', function () {
    src.focus();
});

// console
let output = document.getElementById('console');

// tab space
let tabSpace = '&nbsp;&nbsp;'; // 2

// todo where to put the cursor in load up

let editorOnFocus = true;

// fixme all the key downs are down
window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'SoftLeft':
        case 'F4':
            if (!editorOnFocus) {
                document.getElementById('console').innerHTML = mainOutput = '';
                break;
            }
            // tab was pressed
            let code = src.innerHTML;
            let pos = getSelectionCharacterOffsetWithin(src);
            src.innerHTML = code.substring(0, pos.start) + tabSpace + code.substring(pos.end);
            // fixme caret moves to start
            setCaretPos(pos);
            e.preventDefault();

            console.log('Tab Hit');
            break;
        case 'SoftRight':
        case 'F7':
            if (editorOnFocus) {
                output.focus();
                editorOnFocus = !editorOnFocus;
            } else {
                src.focus();
                editorOnFocus = !editorOnFocus;
                break;
            }
            console.log('Code Compiling Started');

            mainOutput = interpret(src.innerText) + '------------------------------------------------------&#010;' + mainOutput;

            document.getElementById('console').innerHTML = mainOutput;
            output.selectionStart = output.selectionEnd = 0;
            console.log('Code Compiling Ended');
            console.log(mainOutput);


            break;
    }
});

// fixme shorten this things and filter out the IE jargon
function getSelectionCharacterOffsetWithin(element) {
    var start = 0;
    var end = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.startContainer, range.startOffset);
            start = preCaretRange.toString().length;
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            end = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToStart", textRange);
        start = preCaretTextRange.text.length;
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        end = preCaretTextRange.text.length;
    }
    return {
        start: start,
        end: end
    };
}

function setCaretPos(pos) {}

/*
function highlightSyntax() {
    let tokens = src.innerText.trim().replace(/\s\s+/g, ' ').replace(/;/g, '').split(' ');
    let commonTokens = [];
    for (let i = 0; i < tokens.length; i++) {
        if (commonTokens.indexOf(tokens[i])) {
            commonTokens.push(tokens[i]);
        }
    }
    let pointer = src.selectionStart;
    let codeHTML = src.innerHTML;
    for (let i = 0; i < commonTokens.length; i++) {
        codeHTML.replace(new RegExp(commonTokens[i], 'g'), function (token) {
            if (!isNaN(token)) {
                // a number
            } else if (token[0] === '\'') {
                // a string
                return `<span class="string">${token}</span>`;
            } else if (variables[token] != null) {
                //  a variable
                return `<span class="variable">${token}</span>`;
            }
            for (let module in modulesInScope) {
                let func = modulesInScope[module][token];
                if (func != null) {
                    // a function
                    return `<span class="standardFunc">${token}</span>`;
                }
            }
        });
    }
    
    src.innerHTML = codeHTML;
    src.selectionStart = src.selectionEnd = pointer;
}
//*/