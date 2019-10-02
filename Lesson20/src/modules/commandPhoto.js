const commandPhoto = () => {
    const photos = document.querySelector('.command>.container');

    photos.addEventListener('mouseover', (event) => {
        let target = event.target;

        if (target.matches('.command__photo')) {
            target.dataset.originalImg = target.src;
            target.src = target.dataset.img;
        }
    });

    photos.addEventListener('mouseout', (event) => {
        let target = event.target;
        if (target.matches('.command__photo')) {
            target.src = target.dataset.originalImg;
        }
    });
};

export default commandPhoto;