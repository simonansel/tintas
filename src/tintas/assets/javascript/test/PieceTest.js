"use strict"

var TintasTestCase =  TestCase ("TintasTestCase");

TintasTestCase.prototype.testColor = function () {

    for( var i =0; i < 7; i++){
        var piece = new Tintas.Piece(Tintas.Colors[i]);
        assertTrue((piece.get_color_name() === Tintas.Colors[i]) === true)
    }
};