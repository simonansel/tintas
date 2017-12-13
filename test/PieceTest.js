"use strict"

var TintasTestCase =  TestCase ("TintasTestCase");

TintasTestCase.prototype.testColor = function () {

    var test = false;

    for( var i =1; i < 8; i++){
        var piece_test = new Tintas.Piece(i);
        if (Tintas.Colors.piece_test.get_color() === Tintas.Colors[i]) {
            test = true;
        }else{
            test = false;
        }
    }
    assertTrue(true, test);

};