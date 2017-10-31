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
    };

};
