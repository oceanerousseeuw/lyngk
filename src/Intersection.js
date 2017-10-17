"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {

    var nbPiece = 0;
    var color;


    this.getState = function(){
        if(nbPiece === 0){
            return Lyngk.State.VACANT;
        }
        else{
            if(nbPiece === 1) {
                return Lyngk.State.ONE_PIECE;
            }else if(nbPiece >= 2 && nbPiece < 5){
                return Lyngk.State.STACK;
            }
        }
    };

    this.getColor = function () {
        return color;
    };

    this.poserPiece = function(piece){
        color = piece.getColor();
        nbPiece ++;
    }
};
