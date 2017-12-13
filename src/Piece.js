"use strict";

Tintas.Colors = [null, "RED", "BLUE", "YELLOW", "GREEN", "WHITE", "PURPLE", "ORANGE"];

Tintas.Piece = function (c) {

    var private_color;

    var init = function(c){
        private_color = c;
    };

    this.get_color_name = function() {
        return private_color;
    };

    this.get_color_value = function() {
        var value = Tintas.Colors.indexOf(private_color);
        return value;
    };

    init(c);
};
