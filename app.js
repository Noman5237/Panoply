let mainOutput = '';

window.addEventListener('DOMContentLoaded', function () {
    
    // src code
    let src = document.getElementById('srcCode');
    src.focus();
    
    // console
    let output = document.getElementById('console');
    
    // tab space
    let tabSpace = '  ';   // 2
    
    // todo where ot put the cursor in load up
    
    let editorOnFocus = true;
    
    window.addEventListener('keydown', function (e) {
        switch (e.key) {
            case 'SoftLeft':
                if (!editorOnFocus) {
                    document.getElementById('console').innerHTML = mainOutput = '';
                    break;
                }
                // tab was pressed
                let start = src.selectionStart;
                let end = src.selectionEnd;
                let code = src.value;
                
                src.value = code.substring(0, start) + tabSpace + code.substring(end);
                
                src.selectionStart = src.selectionEnd = start + tabSpace.length;
                e.preventDefault();
                
                output.log('Tab Hit');
                break;
            case 'SoftRight':
                if (editorOnFocus) {
                    output.focus();
                    editorOnFocus = !editorOnFocus;
                } else {
                    src.focus();
                    editorOnFocus = !editorOnFocus;
                    break;
                }
                console.log('Code Compiling Started');
                
                mainOutput = interpret(src.value) + '------------------------------------------------------&#010;' + mainOutput;
                
                document.getElementById('console').innerHTML = mainOutput;
                output.selectionStart = output.selectionEnd = 0;
                console.log('Code Compiling Ended');
                console.log(mainOutput);
                
                break;
        }
    });
    
});
