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

  $.get("/api/hostedparty").then((response) => {
    displayHtml(response, "host");
  });

  $.get("/api/attendparty").then((response) => {
    console.log(response, "attend");
  });

  $.get("/api/event").then((response) => {
    displayHtml(response, "avail");

    //displayHtml(response);
  });
});
// $.get("/api/allparties").then((response) => displayHtml(response, "avail"));

function displayHtml(input, target) {
  for (var i = 0; i < input.length; i++) {
    var html = `<li class="list-group-item" data-id="${input[i].id}">${input[i].title}

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

    switch (target) {
      case "host":
        console.log("Made it to host case");
        $(".userEvents").append(html);
        break;
      case "attend":
        $(".attendEvents").append(html);
        break;
      case "avail":
        $(".allEvents-list").append(html);
        break;
    }
  }
}
