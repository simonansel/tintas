"use strict";

Tintas.State = ["VACANT", "PLAYER", "PIECE"];

Tintas.Columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
Tintas.Lines = [1, 2, 3, 4, 5, 6, 7, 8, 9];

Tintas.Intersection = function (c, l) {
    var private_column, private_line, private_representation, private_piece, private_state;

    var private_not_valid_positions = [
        "A1", "A2", "A3", "A4", "A5", "A6",              "A9",
        "B1", "B2", "B3",                                "B9",
        "C1", "C2",
        "D1", "D2",
        "E1",                                            "E9",
                                                   "F8", "F9",
                                                   "G8", "G9",
        "H1",                                "H7", "H8", "H9",
        "I1",              "I4", "I5", "I6", "I7", "I8", "I9"
    ];

    this.is_valid = function() {
        return (private_not_valid_positions.indexOf(private_column + private_line) === -1);
    };

    this.get_representation = function() {
        return (this.is_valid() ? private_column + private_line : "invalid");
    };

    var init = function(c, l) {
        private_column = c;
        private_line = l;
    };

    this.hash = function() {
         return parseInt(private_column.charCodeAt(0) + "" + private_line, 10);
    };

    this.get_state = function(){
        if(private_piece !== undefined ) {
            return "PIECE";
        }else{
            return "VACANT";
        }
    };

    this.set_piece = function (p) {
        private_piece = p;
    };

    this.get_color = function () {
        if (private_piece === undefined){
            return undefined;
        }
        return private_piece.get_color_name();
    };

    init(c, l);
};