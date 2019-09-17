const text = document.querySelector('#color'),
    button = document.querySelector('#change');

const getRandom = () => {
    let random =  Math.floor((Math.random()*256));
    //Здесь реализован "красивый вывод", чтобы цифр после решетки всегда было 6
    if (random < 16) {
        return ('0' + random.toString(16));
    }else{
        return random.toString(16);
    }
};

button.addEventListener('click', () => {
    let string = '#' + getRandom() + getRandom() + getRandom();
    document.body.style.backgroundColor = button.style.color = string;
    text.textContent = string;
});