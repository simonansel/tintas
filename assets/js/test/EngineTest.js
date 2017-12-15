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
    for (var c in Tintas.Columns) {
        var line = "";
        for (var l in Tintas.Lines) {
            var intersection = new Tintas.Intersection(Tintas.Columns[c], Tintas.Lines[l]);
            if (intersection.is_valid()){
                var i = intersections[intersection.hash()];
                var co = i.get_color();
                color_count[co] += 1;
            }
        }
    }
    for (var c in color_count){
        assertTrue((color_count[c] === 7) === true);
    }
};


TintasTestCase.prototype.testGameEnds = function() {
    var engine = new Tintas.Engine();
    assertTrue(engine.game_is_over() === false);
    engine.get_players()[0]["RED"] = 7;
    assertTrue(engine.game_is_over() === true);
    engine = new  Tintas.Engine();
    var intersections = engine.get_intersections();
    for (var c in Tintas.Columns) {
        for (var l in Tintas.Lines) {
            var intersection = new Tintas.Intersection(Tintas.Columns[c], Tintas.Lines[l]);
            if (intersection.is_valid() === true) {
                intersections[intersection.hash()].unset_piece();
            }
        }
    }
    assertTrue(engine.game_is_over() === true);
};

TintasTestCase.prototype.testGameMechanics = function() {
    var engine = new Tintas.Engine();
    assertTrue(engine.get_turn() === 0);
    var moves = engine.get_valid_moves();
    assertTrue(moves.length === 49);
    assertTrue(engine.game_is_over() === false);
};