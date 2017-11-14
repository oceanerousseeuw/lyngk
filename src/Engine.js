"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};


Lyngk.Engine = function () {

    var plateau = [];
    var colors = [8, 8, 8, 8, 8, 3];

    this.initialize = function () {
        var lettres = "ABCDEFGHI";
        for (var col = 0; col < 9; col++) {
            for (var lig = 1; lig <= 9; lig++) {
                var coordinates = new Lyngk.Coordinates(lettres[col], lig);
                this.validCoord(coordinates);
            }
        }
    };

    this.validCoord = function (coordinates) {
        if (coordinates.isValid()) {
            var sum = 0;
            for (var i = 0; i < colors.length; i++) {
                sum += colors[i];
            }
            this.insertPiece(coordinates, 43 - sum);
        }
    };

    this.insertPiece = function (coordinates, sum) {
        if (sum < 43) {
            var intersection = new Lyngk.Intersection(coordinates);
            var color = this.randomColor();
            var piece = new Lyngk.Piece(Object.keys(Lyngk.Color)[color]);
            intersection.poserPiece(piece);
            plateau.push(intersection);
        }
    };

    this.randomColor = function () {
        var color;
        do {
            color = Math.floor(Math.random() * (5 + 1));
        } while (colors[color] === 0);
        colors[color]--;
        return color;
    };


    this.getPlateau = function () {
        return plateau;
    };

    this.getBlack = function () {
        return 8 - colors[0];
    };

    this.getIvory = function () {
        return 8 - colors[1];
    };

    this.getBlue = function () {
        return 8 - colors[2];
    };

    this.getRed = function () {
        return 8 - colors[3];
    };

    this.getGreen = function () {
        return 8 - colors[4];
    };

    this.getWhite = function () {
        return 3 - colors[5];
    };

    this.getIntersection = function (c) {
        for (var i = 0; i < plateau.length; i++) {
            if (plateau[i].getCoord().toString() === c) {
                return plateau[i];
            }
        }
    };

    this.movePiece = function(coord1, coord2){
        var color;
        var pile = [];

        var possible = this.possible(coord1, coord2);

        for(var a=0; a<plateau.length; a++){
            if(plateau[a].getCoord().toString() === coord2){
                if((plateau[a].getState()!==Lyngk.State.VACANT) && possible){
                    for(var i=0; i<plateau.length; i++){
                        if(plateau[i].getCoord().toString() === coord1){
                            //on stocke les infos de la case à changer
                            color = plateau[i].getColor();
                            //nbPiDeplace = plateau[i].getNbPieces();
                            pile = plateau[i].getPiecesList();
                            //on vide la case
                            plateau[i].setDecNbPieces();
                            plateau[i].setDecPieceList();
                            plateau[i].setColor("");
                        }
                    }

                    for(var i=0; i<plateau.length; i++){
                        if(plateau[i].getCoord().toString() === coord2){
                            for(var j= 0; j<pile.length; j++){
                                plateau[i].poserPiece(pile[j]);
                            }
                        }
                    }
                    return true;
                }
                return false;
            }
        }
    };



    this.possible = function(coord1, coord2){

        var interDep = this.getIntersection(coord1);
        var interArr = this.getIntersection(coord2);
        if((interDep.getNbPieces()+interArr.getNbPieces()) > 5 ){
            return false;
        }
        if((interDep.getNbPieces() === 1) && (interArr.getNbPieces()>1)){
            return false;
        }
        if(interDep.getNbPieces() < interArr.getNbPieces()){
            return false;
        }

        var deplaceType;
        var coordTemp;
        var interTemp;

        //test des lignes
        if( (coord1[0]===coord2[0] && coord1[1]!==coord2[1])) {
            deplaceType = "ligne";
        }
        //test des colonnes
        else if( (coord1[0]!==coord2[0] && coord1[1]===coord2[1])) {
            deplaceType = "colonne";
        }
        //test des diagonales
        else if(Math.abs(coord1[0].charCodeAt()-coord2[0].charCodeAt()) === Math.abs(coord1[1]-coord2[1])) {
            deplaceType = "diagonale";
        }else{
            return false;
        }

        //test déplacement à la ligne suivante
        if(deplaceType === "ligne"){
            coordTemp = coord1;

            //si on remonte dans les lignes (ex: de 3 a 2)
            if(parseInt(coord1[1]) - parseInt(coord2[1]) > 0){
                while (coordTemp !== coord2){
                    coordTemp = coordTemp[0] + (parseInt(coordTemp[1])-1);
                    interTemp = this.getIntersection(coordTemp);
                    if(interTemp.getState() !== Lyngk.State.VACANT && coordTemp !== coord2){
                        return false;
                    }
                }
                return true;
            }else{
                //si on avance dans les lignes (ex: de 2 a 3)
                while (coordTemp !== coord2){
                    coordTemp = coordTemp[0] + (parseInt(coordTemp[1])+1);
                    interTemp = this.getIntersection(coordTemp);
                    if(interTemp.getState() !== Lyngk.State.VACANT && coordTemp !== coord2){
                        return false;
                    }
                }
                return true;
            }
        }


        //test déplacement à la colonne suivante
        if(deplaceType === "colonne"){
            coordTemp = coord1;

            //si on remonte dans les colonnes (ex: de B a A)
            if(((coord1.charCodeAt(0))-(coord2.charCodeAt(0))) > 0){
                while (coordTemp !== coord2){
                    coordTemp = String.fromCharCode(coordTemp.charCodeAt(0)-1) + coordTemp[1];
                    interTemp = this.getIntersection(coordTemp);
                    if(interTemp.getState() !== Lyngk.State.VACANT && coordTemp !== coord2){
                        return false;
                    }
                }
                return true;
            }else{
               //si on va a une colonne plus loin (ex: de A a B)
                while (coordTemp !== coord2){
                    coordTemp = String.fromCharCode(coordTemp.charCodeAt(0)+1) + coordTemp[1];
                    interTemp = this.getIntersection(coordTemp);
                    if(interTemp.getState() !== Lyngk.State.VACANT && coordTemp !== coord2){
                        return false;
                    }
                }
                return true;
            }
        }


        //test déplacement à la diagonale suivante
        if(deplaceType === "diagonale"){
            coordTemp = coord1;

            //si on remonte dans les diagonales (ex: de A3 a B4)
            if((coord1[0].charCodeAt()-coord2[0].charCodeAt()) < 0){
                while (coordTemp !== coord2){
                    coordTemp = String.fromCharCode(coordTemp.charCodeAt(0)+1) + (parseInt(coordTemp[1])+1);
                    interTemp = this.getIntersection(coordTemp);
                    if(interTemp.getState() !== Lyngk.State.VACANT && coordTemp !== coord2){
                        return false;
                    }
                }
                return true;
            }else {
                while (coordTemp !== coord2){
                    coordTemp = String.fromCharCode(coordTemp.charCodeAt(0)-1) + (parseInt(coordTemp[1])-1);
                    interTemp = this.getIntersection(coordTemp);
                    if(interTemp.getState() !== Lyngk.State.VACANT && coordTemp !== coord2){
                        return false;
                    }
                }
                return true;
            }
        }

        return false;
    };

};
