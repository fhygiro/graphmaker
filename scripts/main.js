function main(container)
{
	if (!mxClient.isBrowserSupported())
	{
		mxUtils.error('Browser is not supported!', 200, false)
	}
	else
	{
		mxEvent.disableContextMenu(container)
				
		var graph = new mxGraph(container)
        new mxRubberband(graph)

		var arrGrElements = new Map() 

        var selectedElementId = null 

        var toConnect = false 
        
		parent = graph.getDefaultParent()
								
		graph.getModel().beginUpdate()
		try
		{
            $("#add-but-rect").click(function(){
                var text = $("#text-elgr-rect").val()
                if(text == ""){ 
                    $("#alert-add").html("Введите текст!")
                    return
                }
                var el = graph.insertVertex(parent, null, text, 0, 0, 80, 30)
                graph.setCellStyles(mxConstants.STYLE_FONTSIZE, 14, [el])
                
                arrGrElements.set(el.id, el)
                $("#text-elgr-rect").val("")
            })

            $("#add-but-elips").click(function(){
                var text = $("#text-elgr-elips").val()
                if(text == ""){ 
                    $("#alert-add").html("Введите текст!")
                    return
                }
                var el = graph.insertVertex(parent, null, text, 0, 0, 80, 30, "shape=ellipse;perimeter=ellipsePerimeter;")
                graph.setCellStyles(mxConstants.STYLE_FONTSIZE, 14, [el])
                
                arrGrElements.set(el.id, el)
                $("#text-elgr-elips").val("")
            })

            $("#remove-el-but").click(function(){
                let toRemove = Array(arrGrElements.get(selectedElementId))
                graph.removeCells(toRemove)
                arrGrElements.delete(selectedElementId)
                selectedElementId = null
                toConnect = false
                $("#redact-el-form").css("visibility", "hidden")
            })

            $("#connect-el-but").click(function(){
                if(selectedElementId != null && !toConnect) {
                    toConnect = true
                    $("#connect-el-but").css("background-color", "#A3FF82")
                    $("#connect-el-but").html("Соединение")
                } else if(selectedElementId != null && toConnect) {
                    $("#connect-el-but").css("background-color", "#EFEFEF")
                    $("#connect-el-but").html("Соединить")
                    toConnect = false
                }
            })

            $("#resize-el-but").click(function(){
                let newSize = Number($("#resize-inp").val())
                if(newSize > 0) {
                    graph.setCellStyles(mxConstants.STYLE_FONTSIZE, newSize, [arrGrElements.get(selectedElementId)])
                }
            })
            
            $(".color-but").click(function(event){
                let id = "#" + event.target.id
                let newColor = $(id).css("background-color")
                graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, newColor, [arrGrElements.get(selectedElementId)])
            })

            $(".color-but-f").click(function(event){
                let id = "#" + event.target.id
                let newColor = $(id).css("background-color")
                graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, newColor, [arrGrElements.get(selectedElementId)])
            })

            $("#clear-but").click(function(){
                let toClear = []
                for(let cell of arrGrElements.values()) {
                    toClear.push(cell)
                }
                arrGrElements.clear()

                graph.removeCells(toClear)
                selectedElementId = null
                toConnect = false
                $("#redact-el-form").css("visibility", "hidden")

                $(".q-column textarea").val("")
                $("#modal-window").css("display", "none")
                $("#hide-but").css("visibility", "hidden")
                $("#pdf-div").css("display", "none")
            })

            graph.addListener(mxEvent.CLICK, function (sender, evt) {
                if(evt.properties.cell != null && !toConnect){ 
                    selectedElementId = evt.properties.cell.id
                    $("#resize-inp").val(String(graph.getCellStyle(arrGrElements.get(selectedElementId)).fontSize))
                    $("#redact-el-form").css("visibility", "inherit")
                }
                
                else if(toConnect && evt.properties.cell != null) { 
                    if(selectedElementId != evt.properties.cell.id) {
                        console.log("done")

                        let edge = graph.insertEdge(parent, null, "", arrGrElements.get(selectedElementId), arrGrElements.get(evt.properties.cell.id))
                        arrGrElements.set(edge.id, edge)

                        selectedElementId = evt.properties.cell.id
                        $("#resize-inp").val(String(graph.getCellStyle(arrGrElements.get(selectedElementId)).fontSize))
                    } else { console.log("ne done") }
                }
                
                else {
                    selectedElementId = null
                    $("#redact-el-form").css("visibility", "hidden")
                    toConnect = false
                    $("#connect-el-but").css("background-color", "#EFEFEF")
                    $("#resize-inp").val("")
                }
            })
		}
		finally
		{
			graph.getModel().endUpdate()
		}
	}
}