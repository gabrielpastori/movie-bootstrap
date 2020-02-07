$(document).ready(function() {

    var table=$('#movieTable').DataTable({
        "paging":false,
        "searching":false,
        "info":false,
        "columnDefs": [
            { "orderable": false, "targets": 2 }
        ],
        "bStateSave": true,
        "fnStateSave": function (oSettings, oData) {
            localStorage.setItem( 'DataTables', JSON.stringify(oData) );
        },
        "fnStateLoad": function (oSettings) {
            return JSON.parse( localStorage.getItem('DataTables') );
        }
    });
    
    $("#add").on("click",function(e){
        
        e.preventDefault();
        var inputVal =parseInt($('#rate').val());
        console.log($('#rate').val());
        if(inputVal<0 || inputVal>10 || Number.isNaN(inputVal)) alert("Rating value must be between 0 and 10")
        else {
        table.row.add([$("#movieTitle").val(),$('#rate').val(),"<button class='btn btn-block btn-danger delete'>Delete</button>"] 
            ).draw();
            $('#movieTitle').val("");
            $('#rate').val("");

        }
        
    });
    $("#movieTable").on('click','.delete',function(){
        table
            .row($(this).parents())
            .remove()
            .draw();
    });
    
} );