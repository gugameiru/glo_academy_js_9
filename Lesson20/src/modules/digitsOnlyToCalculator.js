const digitsOnlyToCalculator = () => {
    const calculator = document.querySelectorAll('.calc-block>input');

    calculator.forEach((element) => {
        element.addEventListener('input', () => {
            element.value = element.value.replace(/\D/g, '');
        });
    });

};

export default digitsOnlyToCalculator;