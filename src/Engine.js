"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};


Lyngk.Engine = function () {

    var plateau = [];
    var countBlack = 0;
    var countIvory = 0;
    var countBlue = 0;
    var countRed = 0;
    var countGreen = 0;
    var countWhite = 0;

    this.initialize = function(){
        var lettres = "ABCDEFGHI";
        for (var col=0; col<9; col++){
            for(var lig=1; lig<=9; lig++){
                //on teste les intersections pour savoir si elles sont sur le plateau
                var coordinates = new Lyngk.Coordinates(lettres[col], lig);
                if(coordinates.is_valid()){
                    if((countBlack+countIvory+countBlue+countRed+countGreen+countWhite) < 43) {
                        //si c'est vrai, on met une piece au hazard, mais on doit avoir 8 de chaque, sauf les blanches (3)
                        var intersection = new Lyngk.Intersection(coordinates);
                        var couleur = this.randomCouleur();
                        var piece = new Lyngk.Piece(Object.keys(Lyngk.Color)[couleur]);
                        intersection.poserPiece(piece);
                        plateau.push(intersection);
                    }
                }
            }
        }
    };

    this.randomCouleur = function () {
        var color = Math.floor(Math.random() * (5 + 1));
        switch(color){
            case 0:
                if(countBlack < 8){
                    countBlack++;
                    return Lyngk.Color.BLACK;
                }else{
                    return this.randomCouleur();
                }

            case 1 :
                if(countIvory < 8){
                    countIvory++;
                    return Lyngk.Color.IVORY;
                }else{
                    return this.randomCouleur();
                }

            case 2 :
                if(countBlue < 8){
                    countBlue++;
                    return Lyngk.Color.BLUE;
                }else{
                    return this.randomCouleur();
                }

            case 3 :
                if(countRed < 8){
                    countRed++;
                    return Lyngk.Color.RED;
                }else{
                    return this.randomCouleur();
                }

            case 4 :
                if(countGreen < 8){
                    countGreen++;
                    return Lyngk.Color.GREEN;
                }else{
                    return this.randomCouleur();
                }

            case 5 :
                if(countWhite < 3){
                    countWhite++;
                    return Lyngk.Color.WHITE;
                }else{
                    return this.randomCouleur();
                }
        }
    };

    this.getPlateau = function(){
        return plateau;
    };

    this.getBlack = function(){
        return countBlack;
    };

    this.getIvory = function(){
        return countIvory;
    };

    this.getBlue = function(){
        return countBlue;
    };

    this.getRed = function(){
        return countRed;
    };

    this.getGreen = function(){
        return countGreen;
    };

    this.getWhite = function(){
        return countWhite;
    };

    this.getIntersection = function(c){
        for(var i=0; i<plateau.length; i++){
            if(plateau[i].getCoord().toString() === c){
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

        var deplaceType;

        //test des lignes
        if( (coord1[0]===coord2[0] && coord1[1]!==coord2[1]))
            deplaceType = "ligne";
        //test des colonnes
        else if( (coord1[0]!==coord2[0] && coord1[1]===coord2[1]))
            deplaceType = "colonne";
        //test des diagonales
        else if(Math.abs(coord1[0].charCodeAt()-coord2[0].charCodeAt()) === Math.abs(coord1[1]-coord2[1]))
            deplaceType = "diagonale";
        else{
            return false;
        }

        //test déplacement à la ligne suivante
        if(deplaceType === "ligne"){
            var coordTemp = coord1;

            //si on remonte dans les lignes (ex: de 3 a 2)
            if(parseInt(coord1[1]) - parseInt(coord2[1]) > 0){
                while (coordTemp !== coord2){
                    coordTemp = coordTemp[0] + (parseInt(coordTemp[1])-1);
                    var interTemp = this.getIntersection(coordTemp);
                    if(interTemp.getState() !== Lyngk.State.VACANT && coordTemp !== coord2){
                        return false;
                    }
                }
                return true;
            }else{
                //si on avance dans les lignes (ex: de 2 a 3)
                while (coordTemp !== coord2){
                    coordTemp = coordTemp[0] + (parseInt(coordTemp[1])+1);
                    var interTemp = this.getIntersection(coordTemp);
                    if(interTemp.getState() !== Lyngk.State.VACANT && coordTemp !== coord2){
                        return false;
                    }
                }
                return true;
            }
        }


        //test déplacement à la colonne suivante
        if(deplaceType === "colonne"){
            var coordTemp = coord1;

            //si on remonte dans les colonnes (ex: de B a A)
            if(((coord1.charCodeAt(0))-(coord2.charCodeAt(0))) > 0){
                while (coordTemp !== coord2){
                    coordTemp = String.fromCharCode(coordTemp.charCodeAt(0)-1) + coordTemp[1];
                    var interTemp = this.getIntersection(coordTemp);
                    if(interTemp.getState() !== Lyngk.State.VACANT && coordTemp !== coord2){
                        return false;
                    }
                }
                return true;
            }else{
               //si on va a une colonne plus loin (ex: de A a B)
                while (coordTemp !== coord2){
                    coordTemp = String.fromCharCode(coordTemp.charCodeAt(0)+1) + coordTemp[1];
                    var interTemp = this.getIntersection(coordTemp);
                    if(interTemp.getState() !== Lyngk.State.VACANT && coordTemp !== coord2){
                        return false;
                    }
                }
                return true;
            }
        }


        //test déplacement à la diagonale suivante
        if(deplaceType === "diagonale"){
            var coordTemp = coord1;

            //si on remonte dans les diagonales (ex: de A3 a B4)
            if((coord1[0].charCodeAt()-coord2[0].charCodeAt()) < 0){
                while (coordTemp !== coord2){
                    coordTemp = String.fromCharCode(coordTemp.charCodeAt(0)+1) + (parseInt(coordTemp[1])+1);
                    var interTemp = this.getIntersection(coordTemp);
                    if(interTemp.getState() !== Lyngk.State.VACANT && coordTemp !== coord2){
                        return false;
                    }
                }
                return true;
            }else {
                while (coordTemp !== coord2){
                    coordTemp = String.fromCharCode(coordTemp.charCodeAt(0)-1) + (parseInt(coordTemp[1])-1);
                    var interTemp = this.getIntersection(coordTemp);
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
