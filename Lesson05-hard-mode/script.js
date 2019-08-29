'use strict';

let arr = ['65416', '24646846', '4687648', '4868438', '38438', '65225', '284'];

arr.forEach(element => {
    if (element[0] == 2 || element[0] == 4){
        console.log(element);
    }
});

let isSimpleCheck = function(number) {
    if (number == 1) {
        return false;
    }
    for (let i = 2; i * i <= number; i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
    
};

let isSimple = function(n) {
    for (let i = 2; i <=n; i++) {
        if (isSimpleCheck(i)) {
            console.log(i + ' Делители этого числа: 1 и ' + i);
        }
    }
    
    
};

isSimple(100);