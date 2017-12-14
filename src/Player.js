"use strict";

Tintas.Player = function() {

    var position;

    this.get_position = function(){
        return position;
    }

    this.set_position = function(pos){
        position=pos;
    };

    var init = function(pos){
        position=pos;
    };

};