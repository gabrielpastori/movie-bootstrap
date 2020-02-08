
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
    if(localStorage.getItem('MoviesList')!=null) {
        var data = JSON.parse(localStorage.getItem('MoviesList'));
    }else{
        var data={};
    }
    
    
    for(var key in data){
        table.row.add([key,data[key],"<button class='btn btn-block btn-danger delete'>Delete</button>"]).draw();
    }
    $("#add").on("click",function(e){
        
        e.preventDefault();
        //var movieTitle=capitalize_Words($("#movieTitle").val().toLowerCase());
        var movieTitle=$("#movieTitle").val();


        var inputVal =parseInt($('#rate').val());
        console.log($('#rate').val());
        if(inputVal<0 || inputVal>10 || Number.isNaN(inputVal)) alert("Rating value must be between 0 and 10")
        else {
            if(data[movieTitle]!=undefined) alert(movieTitle+" alredy exists");
            else{
                data[movieTitle]=inputVal;
                localStorage.setItem( 'MoviesList', JSON.stringify(data) );
                table.row.add([movieTitle,$('#rate').val(),"<button class='btn btn-block btn-danger delete'>Delete</button>"] 
                    ).draw();
                    $('#movieTitle').val("");
                    $('#rate').val("");

                }
                $("tr > td").addClass("align-middle");
            }
        
    });
    $("#movieTable").on('click','.delete',function(){
        delete data[$($(this).parent().parent().children("td")[0]).html()];
        localStorage.setItem( 'MoviesList', JSON.stringify(data) );
        table
            .row($(this).parents())
            .remove()
            .draw();

    });
    
} );