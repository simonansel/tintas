'use strict';

var TintasTestCase = TestCase("TintasIntersectionTestCase");

TintasTestCase.prototype.testValid = function() {
    var intersection = new Tintas.Intersection("A", 7);
    assertTrue(intersection.is_valid() === true);
    assertTrue(intersection.get_representation() === "A7");
    assertTrue(intersection.hash() === 657);
    intersection = new Tintas.Intersection("A", 2);
    assertTrue(intersection.is_valid() === false);
    assertTrue(intersection.get_representation() === "invalid");
};

TintasTestCase.prototype.testNumberValid = function () {
    var count = 0;
    for (var c in Tintas.Columns){
        for (var l in Tintas.Lines){
            var intersection = new Tintas.Intersection(Tintas.Columns[c], Tintas.Lines[l]);
            if (intersection.is_valid() === true){
                count += 1;
            }
        }
    }
    assertTrue(count === 49);
};

TintasTestCase.prototype.testSetPiece = function () {
    var piece = new Tintas.Piece("BLUE");
    var intersection = new Tintas.Intersection("A", 7);
    assertTrue((intersection.get_color() === "NONE") === true);
    intersection.set_piece(piece);
    assertTrue((intersection.get_state() === "PIECE") === true);
    assertTrue((intersection.get_color() === "BLUE") === true);
};

TintasTestCase.prototype.testUnsetPiece = function (){
    var piece = new Tintas.Piece("BLUE");
    var intersection = new Tintas.Intersection("A", 7);
    intersection.set_piece(piece);
    assertTrue((intersection.get_state() === "PIECE" ) === true);
    intersection.unset_piece();
    assertTrue((intersection.get_state() === "VACANT" ) === true);
};