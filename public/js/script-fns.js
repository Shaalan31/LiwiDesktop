/**
 * Function to choose writers and add them to text box
 */
var chosenwriters = [];
function chooseWriter(){
    var found = false;
    var writer_id = document.forms['identifywriter']['writersList'][document.getElementById("writersList").selectedIndex].id;
    var writer_name = document.forms['identifywriter']['writersList'].value;
    var writers = document.getElementById('writers')

    if(chosenwriters.length != 0) {
        for(var i = 0; i < chosenwriters.length; i++){
            if(chosenwriters[i].name.toLowerCase().trim() == writer_name.toLowerCase().trim()){
                found = true;
                break;
            }
        }
        if(!found){
            writers.innerHTML = writers.innerHTML +
                '<div class="input-group mb-3">' +
                '<input style="background-color: rgba(255, 255, 255, 0.3)" type="text" name="chosenwriters[]" class="form-control" readonly="readonly" value="'+ writer_name +'" id="room' + writer_name.trim().toLowerCase() +'">' +
                '<div class="input-group-append">' +
                '<button class="btn btn-outline-danger" type="button" onclick="deleteWriter(&#39;' + writer_name + '&#39;, this);"><i class="fas fa-trash"></i></button>' +
                '</div>' +
                '</div>';

            chosenwriters.push({id: writer_id, name: writer_name.toLowerCase().trim()})
        }

    } else {
        chosenwriters.push({id: writer_id, name: writer_name.toLowerCase().trim()})
        writers.innerHTML = writers.innerHTML +
            '<div class="input-group mb-3">' +
            '<input style="background-color: rgba(255, 255, 255, 0.3)" type="text" name="chosenwriters[]" class="form-control" readonly="readonly" value="'+ writer_name +'" id="room' + writer_name.trim().toLowerCase() +'">' +
            '<div class="input-group-append">' +
            '<button class="btn btn-outline-danger" type="button" onclick="deleteWriter(&#39;' + writer_name + '&#39;, this);"><i class="fas fa-trash"></i></button>' +
            '</div>' +
            '</div>';
    }
}

/**
 * Delete writer from chosenWriters list
 * @param writer_id
 */
function deleteWriter(writer_name, e){
    for(var i = 0; i < chosenwriters.length; i++){
        if(chosenwriters[i].name.toLowerCase().trim() == writer_name.toLowerCase().trim()){
            //delete from array
            chosenwriters.splice(i, 1);
            e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
            break;
        }
    }

}