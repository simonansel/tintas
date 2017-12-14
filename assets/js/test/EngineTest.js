'use strict';

var TintasTestCase = TestCase("TintasEngineTestCase");

TintasTestCase.prototype.testInit = function() {
    var color_count = {};
    for (var c in Tintas.Colors){
        var color = Tintas.Colors[c];
        color_count[color] = 0;
    }
    var engine = new Tintas.Engine();
    var intersections = engine.get_intersections();
    for (var c in Tintas.Colors) {
        for (var l in Tintas.Lines) {
            var intersection = new Tintas.Intersection(Tintas.Colors[c], Tintas.Lines[l]);
            if (intersection.is_valid()){
                color_count[intersections[intersection.hash()].get_color()] += 1
            }
        }
    }
    for (var c in color_count){
        assertEqual();
    }
};