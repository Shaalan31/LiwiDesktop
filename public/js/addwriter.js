var localhost = "localhost:5000";

function addWriter() {
    // Stop form from submitting normally
    // event.preventDefault();

    // Get some values from elements on the page:
    file = document.getElementById("userimage").files[0];
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
function ajaxAW() {
    // //Used in Editing pharmacy
    $('#editpharmacyform').on("submit", function (event) {

        var deletedVal;
        // Stop form from submitting normally
        event.preventDefault();
        var e = document.getElementsByName("status");
        var statusval = e[0].options[e[0].selectedIndex].value;



        // Get some values from elements on the page:
        var $form = $(this),
            fullName = $.trim($('form').find('input[name="fullname"]').val()),
            username = $.trim($('form').find('input[name="username"]').val()),
            phone = $.trim($('form').find('input[name="phone"]').val()),
            address = $.trim($('form').find('input[name="address"]').val()),
            birthday = $.trim($('form').find('input[name="birthday"]').val()),
            nid = $.trim($('form').find('input[name="nid"]').val()),
            //photo = $.trim($('form').find('input[name="userimage"]').val())
            url = "https://" + localhost + "/api/v1/admin/editpharmacy";

        var formtemp = $('#fileUploadForm')[0];
        // Create an FormData object 
        var datatemp = new FormData(formtemp);

        var data = new FormData()
        data.append('userimage', datatemp.get('userimage'))





        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/api/upload/multi",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (response) {

                console.log(response)
                var userdata = {
                    nid: nid,
                    fullName: fullName,
                    username: username,
                    address: address,
                    birthday: birthday,
                    photo: response.data._filename,
                    phoneNumber: phone,
                };


                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: url,
                    data: JSON.stringify(userdata),
                    dataType: 'json',
                    success: function () {
                        // $form.html('<h4>Edited Successfully!</h4>').fadeTo(300, 1);
                        window.location.replace("https://" + localhost + "/admin/pharmacies?redirect=true");
                    },
                    error: function (error) {

                    }
                });


            },
            error: function (e) {

                $("#result").text(e.responseText);
                console.log("ERROR : ", e);
                $("#btnSubmit").prop("disabled", false);

            }
        });


    });
}