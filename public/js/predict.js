var localhost = "localhost:5000";
var predictions = [];
window.onload = function () {
    getAllWriters();
};

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

    if(!validatePrediction())
        return
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
    var ids = [];
    for (var i = 0; i < chosenwriters.length; i++) {
        ids.push(parseInt(chosenwriters[i].id));
    }

    var isArabic = document.getElementById("language").checked;
    var lang = isArabic ? "ar" : "en";
    var data = {
        _filename: fileName,
        writers_ids: ids
    };

    var url = "http://" + localhost + "/predict?lang=" + lang;

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url,
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (response) {
            alert("Success");
            predictions=response.data;
            $.redirect("prediction.html",
                    {
                        predictions: predictions,
                    },
                    "GET");
        }
    });
}

/**
 * Get all writers to choose between them
 */
function getAllWriters() {
    var url = "http://" + localhost + "/writers";

    var selectElement = document.getElementById('writersList');

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
        }
    });
}

/**
 * Function to validate the inputs of prediction "predict.html"
 * @returns {boolean}
 */
function validatePrediction() {
    const writers = document.getElementById('writersList');
    const file = document.getElementById("AttachedFile");

    if(chosenwriters.length == 0){
        writers.setCustomValidity("Please choose writers to identify between them!");
        writers.reportValidity();
        return false;
    } else {
        writers.setCustomValidity("");
        writers.reportValidity();
    }

    if(file.files.length == 0){
        file.setCustomValidity("Please attach the paper!");
        file.reportValidity();
        return false;
    } else {
        file.setCustomValidity("");
        file.reportValidity();
    }


    return true
}




