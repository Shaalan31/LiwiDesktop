var localhost = "localhost:5000";

function predict() {
    uploadImage();
}


function uploadImage() {
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
            alert(error);
        }
    });
}

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
        }
    });
}



