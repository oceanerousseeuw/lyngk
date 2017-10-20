"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {

    var nbPiece = 0;
    var color;
    var coordinates = c;

    this.getCoordinates = function(){
        return coordinates;
    }

    this.getState = function(){
        if(nbPiece === 0){
            return Lyngk.State.VACANT;
        }
        else{
            if(nbPiece === 1) {
                return Lyngk.State.ONE_PIECE;
            }else if(nbPiece >= 2 && nbPiece < 5){
                return Lyngk.State.STACK;
            }else{
                return Lyngk.State.FULL_STACK;
            }
        }
    };

    this.getColor = function () {
        return color;
    };

    this.getNbPieces = function(){
        return nbPiece;
    };

    this.poserPiece = function(piece){
        color = piece.getColor();
        nbPiece ++;
    };
};
