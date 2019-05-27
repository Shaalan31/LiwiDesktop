var localhost = "127.0.0.1:5000";

$("#identifywriter").submit(function(e) {
    e.preventDefault();
});

/**
 * load all writers in the system in the dropdown list
 */
function loadUsers(){
    const noWritersAlert = document.getElementById("noWritersAlert");
    const generalErrorAlert = document.getElementById("generalErrorAlert");

    url = 'http://'+localhost+'/allWriters'
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: url,
        success: function (response) {

            var list = {};
            for(let i = 0; i < response.data.length; i++){
                
                list[response.data[i]['_id']] = response.data[i]['_name']+' - '+response.data[i]['_username'];
             }
             $.each(list, function(key, value) {
                $('#writersList')
                    .append($("<option></option>")
                    .attr("value",key)
                    .text(value));
           });
        },
        error: function (error) {
            if(error.status == 404)
                noWritersAlert.removeAttribute("hidden");
            else
                generalErrorAlert.removeAttribute("hidden");
        }
    });

}

/**
 * Function to send update writer with a new sample paper request
 */
function updateWriter(){
    // validation and add loading button
    const updateButton = document.getElementById("updateButton");
    const errorAlert = document.getElementById("errorAlert");
    const notFoundAlert = document.getElementById("notFoundAlert");


    if(!validateUpdateWriter())
        return;
    else {
        updateButton.disabled = true;
        updateButton.innerText = "";
        updateButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>\n' +
            '  Loading...';

    }

    file = document.getElementById("trainingpaper").files[0];
    url = "http://" + localhost + "/image/training";

    var e = document.getElementById("writersList");
    var writerId = e.options[e.selectedIndex].value
    
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
            
            var url = "http://"+localhost+"/writer?lang="; 

            if ($('#language').is(":checked")){
                url = url+'ar'
            }
            else{
                url = url+'en'
            }
            var userdata = {
                _id: writerId,
                _filename: fileName,
            };

            $.ajax({
                type: "PUT",
                contentType: "application/json",
                url: url,
                data: JSON.stringify(userdata),
                dataType: 'json',
                success: function (response) {
                    errorAlert.setAttribute("hidden", "hidden");
                    notFoundAlert.setAttribute("hidden", "hidden");

                    updateButton.disabled = false;
                    updateButton.innerHTML = "Add &raquo;";

                    const Swal = require('sweetalert2');
                    Swal.fire(
                        'Adding Sample Paper Done',
                        '',
                        'success'
                      )
                },
                error: function (error) {
                    updateButton.disabled = false;
                    updateButton.innerHTML = "Add &raquo;";

                    if(error.status == 404){
                        errorAlert.setAttribute("hidden", "hidden");
                        notFoundAlert.removeAttribute("hidden");
                    }
                    else{
                        notFoundAlert.setAttribute("hidden", "hidden");
                        errorAlert.removeAttribute("hidden");
                    }
                }
            });
        },
        error: function (error) {
            const trainingPaper = document.getElementById("trainingpaper");

            updateButton.disabled = false;
            updateButton.innerHTML = "Add Paper &raquo;";

            trainingPaper.setCustomValidity("Error in uploading writer's sample paper. Please try again!");
            trainingPaper.reportValidity();
        }
    });
}

/**
 * Function to validate update writer's inputs
 * @returns {boolean}
 */
function validateUpdateWriter() {
    const writersList = document.getElementById("writersList");
    const trainingPaper = document.getElementById("trainingpaper");


    // check dropdown menu
    if(writersList.options[writersList.selectedIndex].value == 0){
        writersList.setCustomValidity("Please choose writer.");
        writersList.reportValidity();
        return false;

    } else {
        writersList.setCustomValidity("");
        writersList.reportValidity();
    }

    if(trainingPaper.files.length == 0){
        trainingPaper.setCustomValidity("Please add a sample paper for the writer!");
        trainingPaper.reportValidity();
        return false;

    } else {
        trainingPaper.setCustomValidity("");
        trainingPaper.reportValidity();
    }

    return true;
}