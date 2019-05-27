var localhost = "127.0.0.1:5000";

$("#addPaperForm").submit(function(e) {
    e.preventDefault();
});


/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

/**
 * Function to send request to add training paper
 */
function addPaper(){
    const addButton = document.getElementById("addButton");
    const errorAlert = document.getElementById("errorAlert");

    if(!validateAddPaper())
        return;
    else {
        addButton.disabled = true;
        addButton.innerText = "";
        addButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>\n' +
            '  Loading...';
    }

    file = document.getElementById("trainingpaper").files[0];
    url = "http://" + localhost + "/image/training";


    writerId = getParams(window.location.href).id;
    language = $.trim($('form').find('input[name="trainingpaper"]').val());

    
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
                    addButton.disabled = false;
                    addButton.innerHTML = "Add &raquo;";

                    const Swal = require('sweetalert2');
                    Swal.fire(
                        'Adding Sample Paper Done',
                        '',
                        'success'
                      )
                },
                error: function (error) {
                    addButton.disabled = false;
                    addButton.innerHTML = "Add &raquo;";

                    errorAlert.removeAttribute("hidden");
                }
            });
        },
        error: function (error) {
            const trainingPaper = document.getElementById("trainingpaper");

            addButton.disabled = false;
            addButton.innerHTML = "Add &raquo;";

            trainingPaper.setCustomValidity("Error in uploading writer's sample paper. Please try again!");
            trainingPaper.reportValidity();
        }
    });
}

/**
 * Function to validate add paper inputs
 * @returns {boolean}
 */
function validateAddPaper() {
    const trainingPaper = document.getElementById("trainingpaper");

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