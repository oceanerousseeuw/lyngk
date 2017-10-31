"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {

    var nbPiece = 0;
    var color;
    var coordinates = c;
    var piecesList = [];

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

    this.getNbPieces = function(){
        return nbPiece;
    };

    this.setDecNbPieces = function(){
        nbPiece = 0;
    };

    this.setIncNbPieces = function(nbPiDeplace){
        nbPiece = nbPiece + nbPiDeplace;
    };

    this.getColor = function () {
        return color;
    };

    this.setColor = function(myNewColor){
        color = myNewColor;
    };

    this.getCoord = function(){
        return coordinates;
    };

    this.getPiecesList = function(){
      return piecesList;
    };

    this.setDecPieceList = function(){
        piecesList = [];
    };

    this.poserPiece = function(piece){
        color = piece.getColor();
        nbPiece ++;
        piecesList.push(piece);
    };
};
