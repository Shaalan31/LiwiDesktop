const Swal = require('sweetalert2')


var localhost = "127.0.0.1:5000";

$("#identifywriter").submit(function(e) {
    e.preventDefault();
});

function loadUsers(){
    div = document.getElementById("writersList");
    url = 'http://'+localhost+'/writers'
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: url,
        success: function (response) {

            console.log(response.data)
            var list = {}
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
            //handle different errors
            alert(JSON.stringify(error));
        }
    });

}

function updateWriter(){
    file = document.getElementById("trainingpaper").files[0];
    url = "http://" + localhost + "/image/training";

    var e = document.getElementById("writersList");
    var writerId = e.options[e.selectedIndex].value

    //writerId = $.trim($('form').find('input[name="writersList"]').val());
    
    
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