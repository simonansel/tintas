"use strict";

Tintas.Colors = ["RED", "BLUE", "YELLOW", "GREEN", "WHITE", "PURPLE", "ORANGE"];

Tintas.Pictures = {
    "BLUE" : "bleu.png",
    "RED" : "rouge.png",
    "YELLOW" : "jaune.png",
    "GREEN" : "vert.png",
    "WHITE" : "blanc.png",
    "PURPLE" : "violet.png",
    "ORANGE" : "orange.png",
    "NONE" : "vide.png"
};

Tintas.Piece = function (c) {

    var private_color;

    var init = function(c){
        private_color = c;
    };

    this.get_color_name = function() {
        return private_color;
    };

    init(c);
};
