const toggleMenu = () => {

    const menu = document.querySelector('menu'),
        main = document.querySelector('main');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    menu.addEventListener('click', (event) => {
        let target = event.target;
        console.log(target);
        if (target.classList.contains('close-btn') || target.closest('menu ul>li')) {
            handlerMenu();
        }
    });

    main.addEventListener('click', (event) => {
        let target = event.target;
        if (target.closest('.menu')) {
            handlerMenu();
        } else {
            menu.classList.remove('active-menu');
        }
    });

};

export default toggleMenu;