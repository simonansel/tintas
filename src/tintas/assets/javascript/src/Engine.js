"use strict";

// enums definition
Tintas.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Tintas.Engine = function () {
    var private_pieces, private_current_position, private_turn, private_players, private_previous_color;
    var private_intersections = [];

    this.get_intersections = function(){
        return private_intersections;
    };

    var first_turn = function() {
        return private_previous_color === undefined;
    };

    var same_color = function(hash) {
        return private_intersections[hash].get_color() === private_previous_color;
    };

    var piece_in_da_place = function(hash) {
        return private_intersections[hash].get_state() === "PIECE";
    };

    var target_is_valid = function(hash) {
        return private_intersections[hash].is_valid();
    };

    var move_is_valid = function(hash_to) {
        return (
            piece_in_da_place(hash_to) && target_is_valid(hash_to) && (
                first_turn() || same_color(hash_to)
            )
        )
    };

    var get_adjacent_filled_intersections = function() {
        var adjacent_intersections = [];
        var directions = [-10, -9, -1, 1, 9, 10];
        for (var d in directions) {
            var direction = directions[d];
            var next = private_intersections[private_current_position + direction];
            while(next !== undefined) {
                if(next.state() !== "VACANT") {
                    adjacent_intersections.push(next);
                    next += direction;
                }
            }
        }
        return adjacent_intersections;
    };

    var get_all_valid_intersections = function() {
        var valid_moves = [];
        for (var c in Tintas.Columns){
            var column = Tintas.Columns[c];
            for (var l in Tintas.Lines){
                var line = Tintas.Lines[l];
                var intersection = new Tintas.Intersection(column, line);
                if (intersection.is_valid()){
                    valid_moves.push(intersection.hash());
                }
            }
        }
        return valid_moves;
    };

    this.get_valid_moves = function() {
        var valid_moves = [];
        var adjacent_intersections = get_adjacent_filled_intersections();
        if (private_turn === 0){
            valid_moves = get_all_valid_intersections();
        }
        else {
            for (var i in adjacent_intersections) {
                var hash = adjacent_intersections[i];
                if (move_is_valid(private_current_position, hash)) {
                    valid_moves.push(hash);
                }
            }
            if (valid_moves.length === 0 && this.game_is_over() === false) {
                valid_moves = get_all_valid_intersections();
            }
        }
        return valid_moves;
    };

    this.move = function(hash_to) {
        var valid_moves = this.get_valid_moves();
        if (valid_moves.indexOf(hash_to) > -1){
            var player = private_players[private_turn % 2];
            var intersection = private_intersections[hash_to];
            var color = intersection.get_color();
            player[color] += 1;
            intersection.unset_piece();
            private_previous_color = color;
            return true;
        }
        return false;
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
                var intersection = new Tintas.Intersection(Tintas.Columns[c], Tintas.Lines[l]);
                if (intersection.is_valid() === true){
                    if (private_intersections[intersection.hash()].get_state() === "PIECE") {
                        return false;
                    }
                }
            }
        }
        return true;
    };


    this.game_is_over = function() {
        return (seven_pieces_collected() || no_pieces_left());
    };

    this.first_turn_ended = function () {
        return ((private_turn === 0) && (private_current_position !== undefined));
    };

    this.no_accessible_colors_left = function() {
        var moves = this.get_valid_moves();
        for (var m in moves){
            var hash =  moves[m];
            if (private_intersections[hash].get_color() === private_previous_color){
                return false;
            }
        }
        return true;
    };

    this.turn_is_over = function() {
        return (this.first_turn_ended() || this.no_accessible_colors_left());
    };

    this.next_turn = function() {
        private_previous_color = undefined;
        private_turn += 1;
    };

    this.get_players = function() {
        return private_players;
    };


    var init_colors = function() {
        var colors = {};
        for (var c in Tintas.Colors){
            var color = Tintas.Colors[c];
            colors[color] = 7;
        }
        return colors;
    };

    var get_initial_count = function() {
        var count = {};
        for (var c in Tintas.Colors) {
            var color = Tintas.Colors[c];
            count[color] = 0;
        }
        return count;
    };

    this.get_turn = function() {
        return private_turn;
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
