$(document).ready(function () {

	//Create new party 
	$("#createPartyBtn").on("click", function () {
		$.post("/api/newparty", {
			title: $("#eventTitle").val().trim(),
			theme: $("#eventTheme").val().trim(),
			date: $("#eventDate").val(),
			time: $("#eventTime").val(),
			location: $("#eventLoc").val().trim()
		}).then(function(){
			window.location.reload();
		})
	});
});
