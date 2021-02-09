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

  $(document).on("click", ".attend-btn", function (e) {
    id = e.target.id;
    $.get("/api/addattendee/:" + id).then(() => {
      window.reload();
    });
  });

  $(document).on("click", "PLACEHOLDER", function (e) {
    id = e.target.id;
    $.get("/api/unattend/:" + id).then(() => {
      window.reload();
    });
  });

  $.get("/api/hostedparty").then((response) => {
    hostedHtml(response);
  });

  $.get("/api/attendingparties").then((response) => {
    displayHtml(response, "attend");
  });

  $.get("/api/availableparty").then((response) => {
    displayHtml(response, "avail");

  });
});


function hostedHtml(input) {
  console.log(input);
  for (var i = 0; i < input.length; i++) {
    var html = `<li class="list-group-item" data-id=${input[i].id}>${input[i].title}

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
			<span><button id=${input[i].id} class="li-btn-delete" data-id=${input[i].id}>Delete</button></span>
		</div>
	</div>
		`;


    $(".userEvents").append(html);

    $(document).on("click", ".li-btn-delete", (e) => {
      console.log(e.target.id);
      console.log($(this));
      var id = e.target.id;
      console.log(id);
      $.ajax({
        url: "/api/hostedparty/" + id,
        method: "DELETE",
      }).then(() => {
        console.log("Deleted");
        window.location.reload();
      });
    });
  }
}

function allParties(input) {
  for (var i = 0; i < input.length; i++) {
    var html = `<li class="list-group-item">${input[i].title}
  <button
    class="li-btn"
    data-id=""
    data-toggle="collapse"
    data-target="#eventInfo-all"
    >View Party</button>
  </li>

  <div class="collapse" id="eventInfo-all">
    <div class="card card-body">

      <p class="host-name">Host: $input[i].name}</p> 


      <p>Theme:${input[i].theme}</p>
      <p>Location:${input[i].location}</p>
      <p>Date:${input[i].date}</p>
      <p>Time:${input[i].time}</p>
      <hr />
      <button id=${input[i].id} class="attend-btn" data-id=${input[i].id}>Attend Party</button>
    </div>
  </div>`;

    $(".allEvents-list").append(html);

  }
}

function upcomingParties(input) {
  // console.log(input);
  for (var i = 0; i < input.length; i++) {
    var html = `<li class="list-group-item" data-id=${input[i].id}>${input[i].title}

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

      <p class="host-name">Host: ${input[i].name}</p>

			<span>Theme: ${input[i].theme}</span>
			<span>Date: ${input[i].date}</span>
			<span>Time: ${input[i].time}</span>
			<span>Location: ${input[i].location}</span>
			<hr />
			<span><button id=${input[i].id} class="li-btn-delete" data-id=${input[i].id}>Delete</button></span>
		</div>
	</div>
		`;

    $(".userEvents").append(html);

    $(document).on("click", ".li-btn-delete", (e) => {
      console.log(e.target.id);
      console.log($(this));
      var id = e.target.id;
      console.log(id);
      $.ajax({
        url: "/api/hostedparty/" + id,
        method: "DELETE",
      }).then(() => {
        console.log("Deleted");
        window.location.reload();
      });
    });
  }
}
