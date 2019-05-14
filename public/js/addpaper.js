const Swal = require('sweetalert2')

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


function addPaper(){
    file = document.getElementById("trainingpaper").files[0];
    url = "http://" + localhost + "/image/training";


    writerId = getParams(window.location.href).id
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
                    Swal.fire(
                        'Training Done',
                        '',
                        'success'
                      )
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


}