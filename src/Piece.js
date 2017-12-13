"use strict";

Tintas.Colors = {RED : 1, BLUE : 2, YELLOW : 3, GREEN : 4, WHITE : 5, PURPLE : 6, ORANGE : 7};

Tintas.Piece = function (c) {

    var private_color;

    var init = function(c){
        private_color = c;
    };

    this.get_color = function() {
        return this.private_color;
    };

    init(c);
};
