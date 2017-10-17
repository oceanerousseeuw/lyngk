"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    // soit c une couleur de pion
    this.state = function(){
        if(c==""){
            return Lyngk.State.VACANT;
        }
    }
};
