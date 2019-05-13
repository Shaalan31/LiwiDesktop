var localhost = "localhost:5000";

function predict() {
    // Stop form from submitting normally
    // event.preventDefault();

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
            var fileName = response.data;
            // response.data._filename
            // var testingRequestModel = {
            //   _filename:,
            //    writers_ids:
            // };
        },
        error: function (error) {
            alert(error);
        }
    });
};