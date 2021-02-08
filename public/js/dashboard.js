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


// function allParties(){
// 	$(#allEvent)
// 	var allP= `
// 	<div class="row">
//     <div class="col col-md-1"></div>
//     <div class="col col-md-10">
//       <div class="card" id="allEvents">
//         <div class="card-body">
//           <h5 class="card-title">All Events</h5>
//           <hr />
//           <ul class="allEvents-list">
          
//           </ul>
//         </div>
//       </div>
//     </div>
//     <div class="col col-md-1"></div>
//     <!-- IGNORE TOP COL-->
//   </div>
//   <!-- End All Events -->
// </div>
// 	`
// }