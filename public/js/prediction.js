/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
function loadPredictions() {
    const predictions = JSON.parse(window.localStorage.getItem("predictions"));

    for (let i = 0; i < predictions.length; i++) {
        switch (i) {
            case 0:
                var nameP = document.getElementById('nameP');
                var usernameP = document.getElementById('usernameP');
                var nidP = document.getElementById('nidP');
                var birthdayP = document.getElementById('birthdayP');
                var phoneP = document.getElementById('phoneP');
                var imageP = document.getElementById('imageP');
                var addressP = document.getElementById('addressP');
                nameP.innerHTML += (" " + predictions[i]._name);
                usernameP.innerHTML += (" " + predictions[i]._username);
                nidP.innerHTML += (" " + predictions[i]._nid);
                phoneP.innerHTML += (" " + predictions[i]._phone);
                addressP.innerHTML += (" " + predictions[i]._address);
                birthdayP.innerHTML += (" " + predictions[i]._birthday);
                imageP.src = predictions[i]._image;
                break;
            case 1:
                break;
            case 2:
                break;
        }
    }
}