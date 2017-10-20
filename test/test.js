'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");


LyngkTestCase.prototype.testStory1 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);
    assertFalse(coordinates.is_valid());
};


LyngkTestCase.prototype.testStory2 = function () {

    var count = 0;
    var col = "ABCDEFGHI";

    for (var i = 0; i < col.length; i++) {
        for (var j = 1; j <= 9; j++) {
            var coordinates = new Lyngk.Coordinates(col[i], j);
            if (coordinates.is_valid()) {
                count++;
            }
        }
    }
    assertTrue(count === 43);
};


LyngkTestCase.prototype.testStory3 = function () {
    var coordinates = new Lyngk.Coordinates('A', 3);
    assertTrue(coordinates.toString() === "A3");
};

LyngkTestCase.prototype.testStory4 = function () {
    var coordinates = new Lyngk.Coordinates("A", 1);
    assertTrue(coordinates.invalid() === "invalid");
};

LyngkTestCase.prototype.testStory5 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);
    var newCoord = coordinates.clone();
    assertTrue(coordinates.toString() == newCoord);
};

LyngkTestCase.prototype.testStory6 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);
    assertTrue(coordinates.hash() === 651);
};

LyngkTestCase.prototype.testStory7 = function () {
    var intersection = new Lyngk.Intersection("");
    assertTrue(intersection.getState() === Lyngk.State.VACANT);
};

LyngkTestCase.prototype.testStory8 = function () {
    var piece = new Lyngk.Piece("BLUE");
    var intersection = new Lyngk.Intersection();
    intersection.poserPiece(piece);
    assertTrue(intersection.getColor() === "BLUE" && intersection.getState() === Lyngk.State.ONE_PIECE);
};

LyngkTestCase.prototype.testStory9 = function () {
    var pieceBleu = new Lyngk.Piece("BLUE");
    var intersection = new Lyngk.Intersection();
    intersection.poserPiece(pieceBleu);
    var pieceRouge = new Lyngk.Piece("RED");
    intersection.poserPiece(pieceRouge);
    assertTrue(intersection.getColor() === "RED" && intersection.getState() === Lyngk.State.STACK);
};

LyngkTestCase.prototype.testStory10 = function () {
    var intersection = new Lyngk.Intersection();
    var pieceRouge = new Lyngk.Piece("RED");
    var i = 1;
    while (i <= 5) {
        intersection.poserPiece(pieceRouge);
        i++;
    }
    assertTrue(intersection.getState() === Lyngk.State.FULL_STACK);

};

LyngkTestCase.prototype.testStory11 = function(){
    var plateau = new Lyngk.Engine();
    plateau.initialize();
    var monPlateau = plateau.getPlateau();
    for(var i=0; i<monPlateau.length; i++){
        assertTrue(monPlateau[i].getState() === Lyngk.State.ONE_PIECE);
    }
};

LyngkTestCase.prototype.testStory12 = function(){
    var plateau = new Lyngk.Engine();
    plateau.initialize();
    assertTrue(plateau.getBlack() === 8);
    assertTrue(plateau.getIvory() === 8);
    assertTrue(plateau.getBlue() === 8);
    assertTrue(plateau.getRed() === 8);
    assertTrue(plateau.getGreen() === 8);
    assertTrue(plateau.getWhite() === 3);
};

LyngkTestCase.prototype.testStory13 = function() {
    var plateau = new Lyngk.Engine();
    plateau.initialize();
    var monPlateau = plateau.getPlateau();
    for(var i=0; i<monPlateau.length; i++){
        assertTrue(monPlateau[i].getNbPieces() === 1);
    }
};

LyngkTestCase.prototype.testStory14 = function(){
    var plateau = new Lyngk.Engine();
    plateau.initialize();
    var monPlateau = plateau.getPlateau();
    for(var i=0; i<monPlateau.length; i++){
        assertTrue(monPlateau[i].getPiecesList().length >= 1);
        assertTrue(monPlateau[i].getPiecesList().length <=5);
    }
};

LyngkTestCase.prototype.testStory15 = function(){
    var plateau = new Lyngk.Engine();
    plateau.initialize();
    var color = plateau.getIntersection("A3").getColor();
    plateau.movePiece("A3", "B3");
    assertTrue(plateau.getIntersection("A3").getState() === Lyngk.State.VACANT);
    assertTrue(plateau.getIntersection("B3").getColor() === color);
};

LyngkTestCase.prototype.testStory16 = function(){
    var plateau = new Lyngk.Engine();
    plateau.initialize();
    var color = plateau.getIntersection("A3").getColor();
    plateau.movePiece("A3", "B3");
    plateau.movePiece("B3", "B2");
    assertTrue(plateau.getIntersection("B3").getState() === Lyngk.State.VACANT);
    assertTrue(plateau.getIntersection("B2").getColor() === color);
};