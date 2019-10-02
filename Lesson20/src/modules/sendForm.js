const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Ожидайте звонка нашего менеджера';

    const form1 = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3'),
        url = './server.php';

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';

    form1.addEventListener('submit', (event) => {
        event.preventDefault();
        form1.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        

        const formData = new FormData(form1);
        let body = {};

        formData.forEach((val, key) => {
            body[key] = val;
        });

        postData(body, url)
            .then(outputData)
            .catch(errorData)
            .finally(clearForm(form1));

    });

    form2.addEventListener('submit', (event) => {
        event.preventDefault();
        form2.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        

        const formData = new FormData(form2);
        let body = {};

        formData.forEach((val, key) => {
            body[key] = val;
        });

        postData(body, url)
            .then(outputData)
            .catch(errorData)
            .finally(clearForm(form2));
    });

    form3.addEventListener('submit', (event) => {
        event.preventDefault();
        form3.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        

        const formData = new FormData(form3);
        let body = {};

        formData.forEach((val, key) => {
            body[key] = val;
        });

        postData(body, url)
            .then(outputData)
            .catch(errorData)
            .finally(clearForm(form3));
        
    });

    const outputData = (response) => {
        if (response.status != 200) {
            throw new Error('network status is not 200');
        }
        console.log(response);
        statusMessage.textContent = successMessage;
    };

    const errorData = (error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
    };

    const postData = (body, url) => {
        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 
            'application/json'},
            body: JSON.stringify(body)

        });
        
    };

    const clearForm = (form) => {
        let elementsForm = [...form.elements].filter(item => { 
            return item.tagName.toLowerCase() !== 'button' && item.type != 'button';
        });

        elementsForm.forEach(elem => {
            elem.value = '';
            elem.style = "border-style: none !important;";
        });

    };
};

export default sendForm;