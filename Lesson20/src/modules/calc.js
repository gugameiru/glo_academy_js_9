const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    let totalPrev = 0;

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;

        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
        }
        if (total > totalPrev) {
            scrollUp(totalPrev, total, 5, 100);
        } else if (total < totalPrev) {
            scrollDown(totalPrev, total, 5, 100);
        }
    };

    // Здесь реализована быстрая смена цифр вверх
    const scrollUp = (start, stop, timeout, step) => {
        let i = start;
        totalValue.textContent = i;
        setTimeout(function scr() {
            if (i <= stop) {
                totalValue.textContent = i;
                i = i + step;
                setTimeout(scr, timeout);
            } else {
                totalValue.textContent = stop;
                totalPrev = stop;
            }
        });
    };

    // Здесь реализована быстрая смена цифр вниз   
    const scrollDown = (start, stop, timeout, step) => {
        let i = start;
        totalValue.textContent = i;
        setTimeout(function scr() {
            if (i >= stop) {
                totalValue.textContent = i;
                i = i - step;
                setTimeout(scr, timeout);
            } else {
                totalValue.textContent = stop;
                totalPrev = stop;
            }
        });
    };

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;

        // Способ 1
        // if (target.matches('.calc-type') ||target.matches('.calc-square') ||target.matches('.calc-day') || target.matches('.calc-count')) {
        //     console.log(target);
        // }

        // Способ 2
        // if(target == calcType || target == calcSquare || target == calcDay || target == calcCount) {
        //     console.log(target);
        // }

        // Способ 3
        if (target.matches('input') || target.matches('select')) {
            countSum();
        }
    });
};

export default calc;