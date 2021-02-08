$(document).ready(function () {
let currentUserId;

	$.get("/api/user_data").then(function (data) {
		 currentUserId = data.id;
	});



	//Create new party 
	$("#createPartyBtn").on("click", function () {
		$.post("/api/newparty", {
			title: $("#eventTitle").val().trim(),
			theme: $("#eventTheme").val().trim(),
			date: $("#eventDate").val(),
			time: $("#eventTime").val(),
			location: $("#eventLoc").val().trim(),
			hostId: currentUserId
		}).then(function () {
			window.location.reload();
		})
	});
});
