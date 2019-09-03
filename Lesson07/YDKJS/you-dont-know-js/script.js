let bookAncestor = document.querySelector('.books'),
    elem = document.querySelectorAll('.book');

let makeOrder = function(element) {
    bookAncestor.appendChild(element);
}

makeOrder(elem[1]);
makeOrder(elem[0]);
makeOrder(elem[4]);
makeOrder(elem[3]);
makeOrder(elem[5]);
makeOrder(elem[2]);

let bodyPage = document.querySelector('body');
bodyPage.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg);');

let bookTitle = document.querySelectorAll('.books>.book h2 a');
// console.log(bookTitle);
bookTitle[2].textContent = 'Книга 3. this и Прототипы Объектов';

let advDiv = document.querySelector('.adv');
advDiv.setAttribute('style', 'display:none');

let ulAncestor = document.querySelectorAll('.books>.book ul'),
    liElem = document.querySelectorAll('.books>.book ul li');

liElem.forEach(function(item, i, array) {
    console.log(i, item.textContent);
});

console.log(ulAncestor[5]);

ulAncestor[1].insertBefore(liElem[12], liElem[10]);
ulAncestor[1].insertBefore(liElem[14], liElem[10]);
ulAncestor[1].insertBefore(liElem[8], liElem[16]);
ulAncestor[4].insertBefore(liElem[45], liElem[38]);
ulAncestor[4].insertBefore(liElem[38], liElem[42]);
ulAncestor[4].insertBefore(liElem[41], liElem[44]);

let newChapter = document.createElement('li');
newChapter.textContent = 'Глава 8: За пределами ES6';

ulAncestor[5].insertBefore(newChapter, liElem[56]);








