$(document).ready(function () {
  //Create new party
  $("#createPartyBtn").on("click", function () {
    $.post("/api/newparty", {
      title: $("#eventTitle").val().trim(),
      theme: $("#eventTheme").val().trim(),
      date: $("#eventDate").val(),
      time: $("#eventTime").val(),
      location: $("#eventLoc").val().trim(),
    }).then(function () {
      window.location.reload();
    });
  });

  $.get("/api/hostedparty").then((response) => displayHtml(response));
});

function displayHtml(input) {
  //todo get array of objects that represent this users hosted party
  //todo construct long ass string of html
  //todo interate through array of objects and add on to LAS
  //todo Append this list to the "hosted-list-items" <ul>
  //todo function that takes in string? and jquery destination
  console.log(input);

  for (var i = 0; i < input.length; i++) {
    const displayhtml = `<li class="list-group-item" data-id="${input[i].id}">${input[i].title}

	<button
		class="li-btn"
		type="button"
		data-toggle="collapse"
		data-target="#inputInfo-hosted"
		aria-expanded="false"
		aria-controls="inputInfo-hosted">
		View Info
	</button>
</li>

	<div class="collapse" id="inputInfo-hosted">
		<div class="card card-body">
			<span>Theme: ${input[i].theme}</span>
			<span>Date: ${input[i].date}</span>
			<span>Time: ${input[i].time}</span>
			<span>Location: ${input[i].location}</span>
			<hr />
			<span><button class="li-btn-delete">Delete</button></span>
		</div>
	</div>
		`;

    $(".userEvents").append(displayhtml);
  }
}

// parties.forEach((party) => $(".userEvents").append(displayhtml));

// I have to change something
