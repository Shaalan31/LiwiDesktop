/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
function loadPredictions() {
    const predictions = JSON.parse(window.localStorage.getItem("predictions"));

    var secondCard = document.getElementById('secondCard');
    var thirdCard = document.getElementById('thirdCard');
    var SecondaryTitle = document.getElementById('SecondaryTitle');
    var SecondarySubtitle = document.getElementById('SecondarySubtitle');
    switch (predictions.length) {
        case 1:
            secondCard.style.display = "none";
            thirdCard.style.display = "none";
            SecondaryTitle.style.display = "none";
            SecondarySubtitle.style.display = "none";
            break;
        case 2:
            thirdCard.style.display = "none";
            break;
    }

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
                var BtnNameS = document.getElementById('BtnNameS');
                var imageS = document.getElementById('imageS');
                var NameS = document.getElementById('NameS');
                var username = document.getElementById('username1');
                var address = document.getElementById('address1');
                var nid1 = document.getElementById('nid1');
                var birthday1 = document.getElementById('birthday1');
                var phone1 = document.getElementById('phone1');

                BtnNameS.innerHTML += (" " + predictions[i]._name);
                imageS.src = predictions[i]._image;
                NameS.innerHTML += (" " + predictions[i]._name);
                username.innerHTML += (" " + predictions[i]._username);
                address.innerHTML += (" " + predictions[i]._address);
                nid1.innerHTML += (" " + predictions[i]._nid);
                phone1.innerHTML += (" " + predictions[i]._phone);
                birthday1.innerHTML += (" " + predictions[i]._birthday);
                break;
            case 2:
                var BtnNameS = document.getElementById('BtnNameT');
                var imageS = document.getElementById('imageT');
                var NameS = document.getElementById('NameT');
                var username = document.getElementById('username2');
                var address = document.getElementById('address2');
                var nid1 = document.getElementById('nid2');
                var birthday1 = document.getElementById('birthday2');
                var phone1 = document.getElementById('phone2');

                BtnNameS.innerHTML += (" " + predictions[i]._name);
                imageS.src = predictions[i]._image;
                NameS.innerHTML += (" " + predictions[i]._name);
                username.innerHTML += (" " + predictions[i]._username);
                address.innerHTML += (" " + predictions[i]._address);
                nid1.innerHTML += (" " + predictions[i]._nid);
                phone1.innerHTML += (" " + predictions[i]._phone);
                birthday1.innerHTML += (" " + predictions[i]._birthday);
                break;
        }
    }
    window.localStorage.removeItem("predictions");
}