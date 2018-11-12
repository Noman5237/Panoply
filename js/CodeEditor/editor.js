window.addEventListener('DOMContentLoaded', function () {
    
    // src code
    let src = document.getElementById('srcCode');
    src.focus();
    // tab space
    let tabSpace = '   ';   // 3
    
    // todo where ot put the cursor in load up
    
    window.addEventListener('keydown', function (e) {
        switch (e.key) {
            case 'SoftLeft':
                // tab was pressed
                let start = src.selectionStart;
                let end = src.selectionEnd;
                let code = src.value;
                
                src.value = code.substring(0, start) + tabSpace + code.substring(end);
                
                src.selectionStart = src.selectionEnd = start + tabSpace.length;
                e.preventDefault();
                
                console.log('Tab Hit');
                break;
        }
    });

});