const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn');

    //Здесь реализовано отключение анимации для мобильных устройств
    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            if (window.screen.width < 768) {
                popup.style.display = 'block';
            } else {
                setOpacity(popup);
            }
        });
    });

    popup.addEventListener('click', (event) => {
        let target = event.target;

        if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
            // console.log(target);
            if (!target) {
                popup.style.display = 'none';
            }
        }
    });
};

// Анимация - плавное изменение прозрачности
const setOpacity = (elem) => {
    let opacity = 0;
    elem.style.display = 'block';
    elem.style.opacity = opacity;
    setTimeout(function change() {
        if (opacity > 1) {
            return;
        }
        elem.style.opacity = opacity;
        opacity += 0.01;
        setTimeout(change, 0.1);
    }, 60);
};

export default togglePopup;