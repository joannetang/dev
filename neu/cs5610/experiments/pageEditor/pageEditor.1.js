	var editingPage = false;
	var editingAttributes = false;
	
	$(function(){
		$(".tool").click(controller);
		var pageEditor = JSON.parse(localStorage.getItem("pageEditor"));
		updatePageList(pageEditor);
		$(".attributes-dialog").dialog({"autoOpen":false});
		$(".attributes-dialog .ok").click(setElementsAttributes);
		$(".attributes-dialog .cancel").click(function(){$(".attributes-dialog").dialog("close")});






	});
	var HTML = {
		"p" : "<p contenteditable=\"true\" class=\"content\">Paragraph</p>",
		"h1" : "<h1 contenteditable=\"true\" class=\"content\">Header</h1>",
		"h2" : "<h2 contenteditable=\"true\" class=\"content\">Header</h2>",
		"ul" : "<ul contenteditable=\"true\" class=\"content\"><li>Unordered List</li></ul>",
		"ol" : "<ol contenteditable=\"true\" class=\"content\"><li>Ordered List</li></ol>",
		"div" : "<div contenteditable=\"true\" class=\"content\">DIV</div>"



	};
	function controller(event) {
		var link = $(event.currentTarget);
		var name = link.attr("name");
		
		if(name == "edit") {
			if(editingPage == true) {
				editingPage = false;
				$(".editTool").html("edit on");
				$(".content").draggable({"grid" : [10,10]});
				
			} else {
				editingPage = true;
				$(".editTool").html("edit off");
				$(".content").draggable("destroy");
				
			}
			return;
		} else if(name == "attributes-dialog") {
			if(editingAttributes == false) {
				editingAttributes = true;
				$(".attributesTool").html("attributes off");
				$(".content").click(function() {
					showAttributesDialog($(this));
				});
			} else {
				editingAttributes = false;
				$(".attributesTool").html("attributes on");
				$(".content").unbind("click");
			}
			return;
		} else if(name == "save") {
			var pageName = $(".pageName").val();
			if(pageName == null || pageName == "" || typeof pageName == "undefined")
				pageName = $(".pageListTool").val();
			if(pageName == null || pageName == "" || typeof pageName == "undefined")
				return;
				
				
				
				
				
				
			var content = $(".body").html();
			
			
			
			
			
			var pageEditor = localStorage.getItem("pageEditor");
			pageEditor = JSON.parse(pageEditor);
			if(pageEditor == null)
				pageEditor = {};
			pageEditor.currentPage = pageName;
			pageEditor[pageName] = content;
			pageEditor = JSON.stringify(pageEditor);
			localStorage.setItem("pageEditor", pageEditor);
		} else if(name == "load") {
			var pageName = $(".pageListTool").val();
			if(pageName == null || pageName == "" || typeof pageName == "undefined")
				pageName = $(".pageName").val();
			if(pageName == null || pageName == "" || typeof pageName == "undefined")
				return;
			var pageEditor = localStorage.getItem("pageEditor");
			pageEditor = JSON.parse(pageEditor);
			if(pageEditor != null) {
				$(".body").empty();
				$(".body").html(pageEditor[pageName]);
				$(".content")
					.draggable({"grid" : [10,10]});
					
					
			}
		} else if(name == "clear") {
			localStorage.removeItem("pageEditor");
			$(".body").empty();
		}
		
		var html = $(HTML[name]);
		html
			.css({"position" : "absolute", "top" : "100px", "left" : "100px"})
			.draggable({"grid" : [10,10]});
			
			
			
			
			
			
			
		$(".body").append(html);
	}
	
	function updatePageList(pageEditor) {
		var pageList = $(".pageListTool").empty();
		for(var pageName in pageEditor) {
			if(pageName == "currentPage")
				continue;
			var option = $("<option>").append(pageName);
			pageList.append(option);
		}
	}
	function showAttributesDialog(element) {
		
		
		$(".attributes-dialog")
			.dialog("open")
			.data("element", element);
		$(".attributes-dialog").find(".name").val(element.attr("name"));
		$(".attributes-dialog").find(".id").val(element.attr("id"));
		$(".attributes-dialog").find(".class").val(element.attr("class"));
		$(".attributes-dialog").find(".style").val(element.attr("style"));
		$(".attributes-dialog").find(".value").val(element.attr("value"));
		$(".attributes-dialog").find(".src").val(element.attr("src"));
		$(".attributes-dialog").find(".href").val(element.attr("href"));
		
	}
	function setElementsAttributes() {
		var element = $(".attributes-dialog")
			.data("element");
		$(".attributes-dialog").dialog("close");
		var name = $(".attributes-dialog").find(".name").val();
		var id = $(".attributes-dialog").find(".id").val();
		var clazz = $(".attributes-dialog").find(".class").val();
		var style = $(".attributes-dialog").find(".style").val();
		var value = $(".attributes-dialog").find(".value").val();
		var src = $(".attributes-dialog").find(".src").val();
		var href = $(".attributes-dialog").find(".href").val();
		
		element.attr("name", name);
		element.attr("id", id);
		element.attr("class", clazz);
		element.attr("style", style);
		element.attr("value", value);
		element.attr("src", src);
		element.attr("href", href);
		
		
	}
