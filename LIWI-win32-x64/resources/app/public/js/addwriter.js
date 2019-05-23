var localhost = "127.0.0.1:5000";

$("#addwriter").submit(function(e) {
    e.preventDefault();
});

/**
 * Function to send request add writer
 */
function addWriter() {

    // Validate and add loading button
    const createButton = document.getElementById("createButton");

    if(!validateAddWriter())
        return;
    else {
        createButton.disabled = true;
        createButton.innerText = "";
        createButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>\n' +
            '  Loading...';
    }

    // Stop form from submitting normally
    // event.preventDefault();

    // Get some values from elements on the page:
    file = document.getElementById("userimage").files[0];
    url = "http://" + localhost + "/image/writers";

    fullName = $.trim($('form').find('input[name="fullname"]').val()),
    username = $.trim($('form').find('input[name="username"]').val()),
    phone = $.trim($('form').find('input[name="phone"]').val()),
    address = $.trim($('form').find('input[name="address"]').val()),
    birthday = $.trim($('form').find('input[name="birthday"]').val()),
    nid = $.trim($('form').find('input[name="nid"]').val())
            
    var formData = new FormData();
    formData.append('image', file);

    // request to upload the image
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
                    id = response.data;
                    $.redirect("addpaper.html",
                    {
                        id: id,
                    },
                    "GET");
                },
                error: function (error) {
                    createButton.disabled = false;
                    createButton.innerHTML = "Identify &raquo;";

                    if(error.status == 409){
                        const username = document.getElementById("username");

                        username.setCustomValidity("This username already exists.");
                        username.reportValidity();

                    } else {
                        const errorAlert = document.getElementById("errorAlert");

                        errorAlert.removeAttribute("hidden");
                    }
                }
            });

        },
        error: function (error) {
            const userImage = document.getElementById("userimage");

            createButton.disabled = false;
            createButton.innerHTML = "Create &raquo;";

            userImage.setCustomValidity("Error in uploading writer's image. Please try again!");
            userImage.reportValidity();

        }
    });
}

/**
 * Function to validate add writer inputs
 * @returns {boolean}
 */
function validateAddWriter() {
    const username = document.getElementById("username");
    const fullname = document.getElementById("fullname");
    const address = document.getElementById("address");
    const phone = document.getElementById("phone");
    const birthday = document.getElementById("birthday");
    const nid = document.getElementById("nid");
    const userimage = document.getElementById("userimage");

    const nidPattern = /(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d"/;
    const phonePattern = /(01)[0 1 2 5][0-9]{8}/;

    // username
    if(username.value.trim() == ""){
        username.setCustomValidity("Please fill out this field.");
        username.reportValidity();
        return false;
    } else if(/\s/.test(username.value.trim())){
        username.setCustomValidity("Username should not contain spaces!");
        username.reportValidity();
        return false;
    }
    else {
        username.setCustomValidity("");
        username.reportValidity();
    }

    // full name
    if(fullname.value.trim() == ""){
        fullname.setCustomValidity("Please fill out this field.");
        fullname.reportValidity();
        return false;

    }  else if(/\d/.test(fullname.value.trim())) {
        fullname.setCustomValidity("Full name should not contain numbers!");
        fullname.reportValidity();
        return false;

    } else {
        fullname.setCustomValidity("");
        fullname.reportValidity();
    }

    // address
    if(address.value.trim() == ""){
        address.setCustomValidity("Please fill out this field.");
        address.reportValidity();
        return false;

    } else {
        address.setCustomValidity("");
        address.reportValidity();
    }

    // phone
    if(phone.value.trim() == ""){
        phone.setCustomValidity("Please fill out this field.");
        phone.reportValidity();
        return false;

    } else if(!phonePattern.test(phone.value.trim())) {
        phone.setCustomValidity("Please match the requested format.");
        phone.reportValidity();
        return false;

    } else {
        phone.setCustomValidity("");
        phone.reportValidity();
    }

    // birthday
    if(!birthday.value){
        birthday.setCustomValidity("Please fill out this field.");
        birthday.reportValidity();
        return false;
    } else {
        birthday.setCustomValidity("");
        birthday.reportValidity();
    }

    // nid
    if(nid.value.trim() == ""){
        nid.setCustomValidity("Please fill out this field.");
        nid.reportValidity();
        return false;
    } else if(nidPattern.test(nid.value.trim())){
        nid.setCustomValidity("Please match the requested format.");
        nid.reportValidity();
        return false;
    } else {
        nid.setCustomValidity("");
        nid.reportValidity();
    }

    // image
    if(userimage.files.length == 0){
        userimage.setCustomValidity("Please add a photo for the writer!");
        userimage.reportValidity();
        return false;
    } else {
        userimage.setCustomValidity("");
        userimage.reportValidity();
    }
    return true;
}

