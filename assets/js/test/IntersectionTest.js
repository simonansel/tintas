'use strict';

var TintasTestCase = TestCase("TintasTestCase");

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