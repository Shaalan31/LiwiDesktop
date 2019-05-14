var localhost = "127.0.0.1:5000";

$("#addwriter").submit(function(e) {
    e.preventDefault();
});

function addWriter() {
    
    // Stop form from submitting normally
    // event.preventDefault();

    // Get some values from elements on the page:
    file = document.getElementById("userimage").files[0];
    url = "http://" + localhost + "/image/testing";

    fullName = $.trim($('form').find('input[name="fullname"]').val()),
    username = $.trim($('form').find('input[name="username"]').val()),
    phone = $.trim($('form').find('input[name="phone"]').val()),
    address = $.trim($('form').find('input[name="address"]').val()),
    birthday = $.trim($('form').find('input[name="birthday"]').val()),
    nid = $.trim($('form').find('input[name="nid"]').val())
            
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
            
            var url = "http://"+localhost+"/writer"; 
            var userdata = {
                _nid: nid,
                _name: fullName,
                _username: username,
                _address: address,
                _birthday: birthday,
                _image: fileName,
                _phone: phone,
            };

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: url,
                data: JSON.stringify(userdata),
                dataType: 'json',
                success: function (response) {
                    alert(JSON.stringify(response));
                },
                error: function (error) {
                    //handle different errors
                    alert(JSON.stringify(error));
                }
            });

            // response.data._filename
            // var testingRequestModel = {
            //   _filename:,
            //    writers_ids:
            // };
        },
        error: function (error) {
            alert('fail')
            alert(error);
        }
    });
};

/*
function ajaxAW() {




        // Get some values from elements on the page:
        var $form = $(this),
            fullName = $.trim($('form').find('input[name="fullname"]').val()),
            username = $.trim($('form').find('input[name="username"]').val()),
            phone = $.trim($('form').find('input[name="phone"]').val()),
            address = $.trim($('form').find('input[name="address"]').val()),
            birthday = $.trim($('form').find('input[name="birthday"]').val()),
            nid = $.trim($('form').find('input[name="nid"]').val()),
            





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
}*/