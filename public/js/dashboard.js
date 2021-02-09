$(document).ready(function () {
  let currentUserId;

  $.get("/api/user_data").then(function (data) {
    currentUserId = data.id;
    console.log(currentUserId);
  });
  // .then(() => {

  // });

  //Create new party
  $("#createPartyBtn").on("click", function () {
    $.post("/api/newparty", {
      title: $("#eventTitle").val().trim(),
      theme: $("#eventTheme").val().trim(),
      date: $("#eventDate").val(),
      time: $("#eventTime").val(),
      location: $("#eventLoc").val().trim(),
      hostId: currentUserId,
    }).then(function () {
      window.location.reload();
    });
  });
  $.get("/api/hostedparty", {
    user_id: currentUserId,
  }).then((response) => {
    console.log(response);
    //displayHtml(response);
  });
});

function displayHtml(input) {
  //todo get array of objects that represent this users hosted party
  //todo construct long ass string of html
  //todo interate through array of objects and add on to LAS
  //todo Append this list to the "hosted-list-items" <ul>
  //todo function that takes in string? and jquery destination

  const displayhtml = `<li class="list-group-item" data-id="${input.id}">${input.title}

	<button
		class="li-btn"
		type="button"
		data-toggle="collapse"
		data-target="#eventInfo-hosted"
		aria-expanded="false"
		aria-controls="eventInfo-hosted">
		View Info
	</button>
</li>

	<div class="collapse" id="eventInfo-hosted">
		<div class="card card-body">
			<span>Theme: ${input.theme}</span>
			<span>Date: ${input.date}</span>
			<span>Time: ${input.time}</span>
			<span>Location: ${input.location}</span>
			<hr />
			<span><button class="li-btn-delete">Delete</button></span>
		</div>
	</div>
		`;

  parties.forEach((party) => $(".userEvents").append(displayhtml));
}

// parties.forEach((party) => $(".userEvents").append(displayhtml));

//
