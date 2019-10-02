const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
        dotWrapper = document.querySelector('.portfolio-dots'),
        slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
        interval;

    // Начало скрипта для добавления точек на страницу
    slide.forEach(() => {
        let dot = document.createElement('li');
        dot.classList.add('dot');
        dotWrapper.appendChild(dot);
    });
    // Конец скрипта добавления точек на страницу
    let dot = document.querySelectorAll('.dot');

    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target;

        if (!target.matches('.portfolio-btn, .dot')) {
            return;
        }

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        if (target.matches('#arrow-right')) {

            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

        } else if (target.matches('#arrow-left')) {

            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

        } else if (target.matches('.dot')) {
            dot.forEach((elem, index) => {
                if (elem == target) {
                    currentSlide = index;
                }
            });
        }

        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
        let target = event.target;
        // console.log(target);

        if (target.matches('.portfolio-btn') || target.matches('.dot')) {
            stopSlide();
        }

    });

    slider.addEventListener('mouseout', (event) => {
        let target = event.target;
        // console.log(target);

        if (target.matches('.portfolio-btn') || target.matches('.dot')) {
            startSlide(2000);
        }

    });

    startSlide(2000);

};

export default slider;