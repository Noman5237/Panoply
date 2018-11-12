window.addEventListener("DOMContentLoaded", function() {
    console.log("Hello World!");
    // navigator.spatialNavigationEnabled = true;
    window.addEventListener('keydown', function(e){
        switch (e.key) {
            case 'SoftRight':
                // todo handle the help page
                break;
            case 'SoftLeft':
                // todo handle the More page
                break;
            default:
                break;
        }
    });
});
