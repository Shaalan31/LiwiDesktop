
$(document).ready(function() {
    $('#bookingsTable').DataTable({"dom": '<lf<t>ip>'});
    $('#roomsTable').DataTable({"dom": '<lf<t>ip>'});
    $('#customersTable').DataTable({"dom": '<lf<t>ip>'});


    if(!$('#dangeralert').is(':hidden')){
        $("#dangeralert").fadeOut(10000 );
    }

} );

