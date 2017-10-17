'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");


LyngkTestCase.prototype.testStory1 = function(){
    var coordinates = new Lyngk.Coordinates('A',1);
    assertFalse(coordinates.is_valid());
};


LyngkTestCase.prototype.testStory2 = function(){

    var count=0;
    var col = "ABCDEFGHI";

    for(var i = 0; i<col.length; i++){
        for(var j = 1; j<=9; j++){
            var coordinates = new Lyngk.Coordinates(col[i],j);
            if(coordinates.is_valid()){
                count++;
            }
        }
    }
    assertTrue(count === 43);
};


LyngkTestCase.prototype.testStory3 = function(){
    var coordinates = new Lyngk.Coordinates('A',3);
    assertTrue(coordinates.toString() === "A3");
};

LyngkTestCase.prototype.testStory4 = function () {
    var coordinates = new Lyngk.Coordinates("A",1);
    assertTrue(coordinates.invalid() === "invalid");
};

LyngkTestCase.prototype.testStory5 = function(){
    var coordinates = new Lyngk.Coordinates('A',1);
    var newCoord = coordinates.clone();
    assertTrue(coordinates.toString() == newCoord);
};

LyngkTestCase.prototype.testStory6 = function(){
    var coordinates = new Lyngk.Coordinates('A',1);
    assertTrue(coordinates.hash() === 651);
};

LyngkTestCase.prototype.testStory7 = function(){
    var intersection = new Lyngk.Intersection("");
    assertTrue(intersection.state() === Lyngk.State.VACANT);
};