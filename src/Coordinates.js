"use strict";

Lyngk.Coordinates = function (c, l) {

    var caseFalse = ["A1","A2","A4","A5","A6","A7","A8","A9","B1",
        "B6","B7","B8","B9","C8","C9","D1","D8","D9","E1","E9",
        "F1","F2","F9","G1","G2","H1","H2","H3","H4","H9","I1",
        "I2","I3","I4","I5","I6","I8","I9"];

    var concat = c + l;


    this.isValid = function () {
        for (var i = 0; i < caseFalse.length; i++) {
            if (concat === caseFalse[i]) {
                return false;
            }
        }
        return true;
    };

    this.toString = function(){
        return concat;
    };

    this.invalid = function(){
        var valid = this.isValid();
        if(!valid){
            concat = "invalid";
        }
        return concat;
    };

    this.clone = function(){
        return concat;
    };

    this.hash = function(){
        var colAsciiChar = String(c.charCodeAt(0));
        var charHash = colAsciiChar + String(l);
        return parseInt(charHash);
    };
};
