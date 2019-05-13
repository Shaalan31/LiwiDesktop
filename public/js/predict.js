var localhost = "localhost:5000";

window.onload = function () {
    getAllWriters();
};


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



