"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

var countBlack = 0;
var countIvory = 0;
var countBlue = 0;
var countRed = 0;
var countGreen = 0;
var countWhite = 0;

Lyngk.Engine = function () {

    var plateau = [];

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
                break;

            case 1 :
                if(countIvory < 8){
                    countIvory++;
                    return Lyngk.Color.IVORY;
                }else{
                    return this.randomCouleur();
                }
                break;

            case 2 :
                if(countBlue < 8){
                    countBlue++;
                    return Lyngk.Color.BLUE;
                }else{
                    return this.randomCouleur();
                }
                break;

            case 3 :
                if(countRed < 8){
                    countRed++;
                    return Lyngk.Color.RED;
                }else{
                    return this.randomCouleur();
                }
                break;

            case 4 :
                if(countGreen < 8){
                    countGreen++;
                    return Lyngk.Color.GREEN;
                }else{
                    return this.randomCouleur();
                }
                break;

            case 5 :
                if(countWhite < 3){
                    countWhite++;
                    return Lyngk.Color.WHITE;
                }else{
                    return this.randomCouleur();
                }
                break;
        }
        return false;
    };

    this.getPlateau = function(){
        return plateau;
    }
};
