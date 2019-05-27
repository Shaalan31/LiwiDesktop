// import io from 'socket.io-client';
// const socketIOClient = require('socket.io-client')

var localhost = "localhost:5000";

function predictOnLoad() {
    const ioClient = socketIOClient.connect("http://127.0.0.1:5000");
    ioClient.on('LIWI', function (data) {
        alert("KHAIRYYYYY B2A");
    });

    // get language
    var hrefParams = new URL(location.href);
    const lang = hrefParams.searchParams.get("lang");
    var showLang;

    // Show the language in the message
    if (lang === 'ar')
        showLang = "Arabic";
    else
        showLang = "English";
    document.getElementById("rememberMessage").innerHTML = document.getElementById("rememberMessage").innerHTML
        + "Please remember to attach " + showLang + " Paper!";

    getAllWriters(lang);
}

/**
 * Function called to predict the writer
 */
function predict() {
    uploadImage();
}

/**
 * Function to send upload image request and save testing image in the server
 */
function uploadImage() {
    // Validate prediction input
    const predictButton = document.getElementById("predictButton");

    if (!validatePrediction())
        return;
    else {
        predictButton.disabled = true;
        predictButton.innerText = "";
        predictButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>\n' +
            '  Loading...';
    }

    // Get some values from elements on the page:
    file = document.getElementById("AttachedFile").files[0];
    url = "http://" + localhost + "/image/testing";

    var formData = new FormData();
    formData.append('image', file);

    $.ajax({
        type: "POST",
        url: url,
        processData: false,
        contentType: false,
        data: formData,
        success: function (response) {
            getPredictions(response.data);
        },
        error: function (error) {
            const file = document.getElementById("AttachedFile");

            predictButton.disabled = false;
            predictButton.innerHTML = "Identify &raquo;";

            file.setCustomValidity("Error in uploading image. Please try again!");
            file.reportValidity();
        }
    });
}

/**
 * Function to send prediction request and get the prediction response
 * @param fileName
 */
function getPredictions(fileName) {
    const predictButton = document.getElementById("predictButton");
    const errorAlert = document.getElementById("errorAlert");
    const writers = document.getElementById('writersList');

    var hrefParams = new URL(location.href);
    const lang = hrefParams.searchParams.get("lang");


    // var ids = [];
    // for (var i = 0; i < chosenwriters.length; i++) {
    //     ids.push(parseInt(chosenwriters[i].id));
    // }

    // var isArabic = document.getElementById("language").checked;
    // var lang = isArabic ? "ar" : "en";

    document.getElementById("buttonImages").click();

    var data = {
        _filename: fileName
        // writers_ids: ids
    };

    var url = "http://" + localhost + "/predict?lang=" + lang;

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url,
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (response) {
            predictButton.disabled = false;
            predictButton.innerHTML = "Identify &raquo;";

            writers.setCustomValidity("");
            writers.reportValidity();

            errorAlert.setAttribute("hidden", "hidden");

            var predictions = response.data;
            window.localStorage.setItem("predictions", JSON.stringify(predictions)); // Saving
            $.redirect("prediction.html",
                {
                    lang: lang
                },
                "GET");
        },
        error: function (error) {

            predictButton.disabled = false;
            predictButton.innerHTML = "Identify &raquo;";

            if (error.status === 400) {
                writers.setCustomValidity("You have exceeded the number of chosen writers.");
                writers.reportValidity();

            } else {
                errorAlert.removeAttribute("hidden");
            }
        }
    });
}

/**
 * Get all writers to choose between them
 */
function getAllWriters(lang) {
    var url = "http://" + localhost + "/writers?lang=" + lang;

    var selectElement = document.getElementById('writersList');
    const noWritersAlert = document.getElementById("noWritersAlert");
    const generalErrorAlert = document.getElementById("generalErrorAlert");

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: url,
        success: function (response) {
            for (var i = 0; i < response.data.length; i++) {
                writer = response.data[i];

                var opt = document.createElement('option');
                opt.id = writer._id;
                opt.innerHTML = writer._name + "<span>" + "  -" + writer._username + "</span>";
                selectElement.appendChild(opt);
            }
        },
        error: function (error) {
            if (error.status == 404)
                noWritersAlert.removeAttribute("hidden");
            else
                generalErrorAlert.removeAttribute("hidden");
        }
    });
}

/**
 * Function to validate the inputs of prediction "predict.html"
 * @returns {boolean}
 */
function validatePrediction() {
    // const writers = document.getElementById('writersList');
    const file = document.getElementById("AttachedFile");

    // if (chosenwriters.length === 0) {
    //     writers.setCustomValidity("Please choose writers to identify between them!");
    //     writers.reportValidity();
    //     return false;
    // } else {
    //     writers.setCustomValidity("");
    //     writers.reportValidity();
    // }

    if (file.files.length === 0) {
        file.setCustomValidity("Please attach the paper!");
        file.reportValidity();
        return false;
    } else {
        file.setCustomValidity("");
        file.reportValidity();
    }


    return true;
}




