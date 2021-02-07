$(document).ready(function () {

	//Create new party 
	$("#createPartyBtn").on("click", function () {
		//Make an object that has all the party info we need for DB insertion
		let party = {
			title: $("#eventTitle").val().trim(),
			theme: $("#eventTheme").val().trim(),
			date: $("#eventDate").val().trim(),
			time: $("#eventTime").val().trim(),
			location: $("#eventLoc").val().trim()
		};
		newParty(party.title, party.theme, party.date, party.time, party.location);

		//AJAX POST to insert new row in party table		
		function newParty(title, theme, date, time, location) {
			$.post("/api/newparty", {
				title: title,
				theme: theme,
				date: date,
				time: time,
				location: location

			}).then(function () {
				window.location.reload();
			})
		}


	});



});