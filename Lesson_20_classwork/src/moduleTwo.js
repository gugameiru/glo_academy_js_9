const moduleTwo = () => {
    setInterval(() => {
        document.body.innerHTML = Date();
    }, 1000);
}

module.exports = moduleTwo;