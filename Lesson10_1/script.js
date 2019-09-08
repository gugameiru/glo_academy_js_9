'use strict';

function DomElement(height, width, background, fontsize) {
    this.selector = '';
    this.height = height;
    this.width = width;
    this.bg = background;
    this.fontSize = fontsize;
}

DomElement.prototype.elementCreator = function(someClass, someText) {
    this.newElem = '';
    this.selector = someClass.charAt(0);
    switch(true) {
        case(this.selector == '.'):
            this.newElem = document.createElement('div');
            this.newElem.className = someClass.slice(1); 
            break;
        case(this.selector == '#'):
            this.newElem = document.createElement('p'); 
            this.newElem.className = someClass.slice(1); 
            break;
    }
    this.newElem.style.background = this.bg;
    this.newElem.style.height = this.height;
    this.newElem.style.width = this.width;
    this.newElem.style.fontSize = this.fontSize;
    this.newElem.textContent = someText;
    document.body.appendChild(this.newElem);
};

let myElement = new DomElement('200px', '200px', 'red', '20px');
let myElement2 = new DomElement('100px', '300px', 'green', '18px')

myElement.elementCreator('.numberOne', 'У попа была собака он её любил');
myElement2.elementCreator('#numberTwo', 'Она съела кусок мяса, он её убил');



