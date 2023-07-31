$(document).ready(function(){
    $("#report-but").click(function(){
        $("#modal-window").css("display", "block")
        $("#hide-but").css("visibility", "inherit")
        $("#pdf-div").css("display", "block")
        var answers = $(".q-column textarea")
        var graphGet = $("#graphContainer")
        var graphSet = $("#graph-modal")

        graphSet.html(graphGet.html())

        $.each(answers, function(index, el){
            if(el.id == ""){
                console.log("none")
            } 
            
            else {
                let toSetId = "#" + el.id.slice(0, -2)
                $(toSetId).html(el.value)
            }
        })
    })

    $("#hide-but").click(function(){
        $("#modal-window").css("display", "none")
        $("#hide-but").css("visibility", "hidden")
        $("#pdf-div").css("display", "none")
    })

    $("#to-pdf").click(function(){
        $("#modal-window").printThis()
    })
})