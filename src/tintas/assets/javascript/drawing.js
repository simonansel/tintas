window.onload = function () {
    // Create a random grid with this configuration.
        var grid = document.getElementById('grid');
        // Delete everything inside the grid element.

        // Create a new grid.
        var App = require('src/App.js');
        var app = new App({
            container: grid,
            tileSize: 45,
            width: 9,
            height: 8,
        });
        return app;


};
