const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`${location.origin}/weather?address=${address}`).then((response) => {
        if (response.status === 200) {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            });
        }
    });
});
