"use strict";

// enums definition
Tintas.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Tintas.Engine = function () {
    var private_pieces, private_current_position, private_turn, private_players, previous_color;
    var private_intersections = [];

    this.get_intersections = function(){
        return private_intersections;
    };

    var no_obstruction_between_intersections = function (hash_from, hash_to, modulus) {
        var low = hash_from > hash_to ? hash_to : hash_from;
        var high = hash_from > hash_to ? hash_from : hash_to;
        for (var i = low; i < high; i += modulus) {
            if (private_intersections.state === "PIECE") {
                return false;
            }
        }
        return true;
    };

    var same_line_without_obstructton = function(hash_from, hash_to){
        var modulus = [1, 9, 10];
        for (var m in modulus){
            if ((hash_from - hash_to) % modulus[m] === 0){
                return no_obstruction_between_intersections(hash_from, hash_to, modulus[m]);
            }
        }
        return false;
    };

    var move_is_valid = function(hash_from, hash_to) {
        return (
            same_line_without_obstructton(hash_from, hash_to) ||
            neighbours(hash_from, hash_to));
    };

    this.get_valid_moves = function() {
        var valid_moves = [];
        for (var c in Tintas.Columns){
            for (var l in Tintas.Lines) {
                var hash = Tintas.Columns[c] + Tintas.Lines[l];
                if (move_is_valid(private_current_position, hash)) {
                    valid_moves.push(hash);
                }
            }
        }
        return valid_moves;
    };


    var seven_pieces_collected = function() {
        for (var p in private_players){
            for (var c in Tintas.Colors){
                var color = Tintas.Colors[c];
                if (private_players[p][color] === 7){
                    return true
                }
            }
        }
        return false;
    };


    var no_pieces_left = function () {
        for (var c in Tintas.Columns) {
            for (var l in Tintas.Lines) {
                var hash = Tintas.Columns[c] + Tintas.Lines[l];
                if (private_intersections[hash].get_state() === "VACANT") {
                    return false;
                }
            }
        }
        return true;
    };


    this.game_is_over = function() {
        return (seven_pieces_collected() || no_pieces_left());
    };

    this.get_players = function() {
        return private_players;
    };


    var init_colors = function() {
        var colors = {};
        for (var c in Tintas.Colors){
            var color = Tintas.Colors[c];
            if (color !== null){
                colors[color] = 7;
            }
        }
        return colors;
    };

    var get_initial_count = function() {
        var count = {};
        for (var c in Tintas.Colors) {
            var color = Tintas.Colors[c];
            if ( color !== null ){
                count[color] = 0;
            }
        }
        return count;
    };

    var generate_players = function() {
        var players = [];
        for (var i = 0; i < 2; i ++ ){
            players[i] = get_initial_count();
        }
        return players;
    };

    var get_random_piece = function() {
        var colors = Object.keys(private_pieces);
        var color = colors[Math.floor(Math.random() * colors.length)];
        private_pieces[color] -= 1;
        if (private_pieces[color] === 0) {
            delete private_pieces[color];
        }
        return new Tintas.Piece(color);
    };

    var init = function(){
        private_pieces = init_colors();
        for (var c in Tintas.Columns){
            for (var l in Tintas.Lines){
                var intersection = new Tintas.Intersection(Tintas.Columns[c], Tintas.Lines[l]);
                if (intersection.is_valid() === true){
                    var p = get_random_piece();
                    intersection.set_piece(p);
                    private_intersections[intersection.hash()] = intersection;
                }
            }
        }
        private_players = generate_players();
        private_turn = 0;
    };

    init();
};
