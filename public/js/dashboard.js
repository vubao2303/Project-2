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
    $.post("/api/addattendee/" + id).then(() => {
      window.location.reload();
    });
  });

  $(document).on("click", "PLACEHOLDER", function (e) {
    id = e.target.id;
    $.get("/api/unattend/" + id).then(() => {
      window.location.reload();
    });
  });

  $.get("/api/hostedparty").then((response) => {
    hostedHtml(response);
  });

  $.get("/api/attendingparties").then((response) => {
    upcomingParties(response);
  });

  $.get("/api/availableparty").then((response) => {
    allParties(response);
  });

  // get the user email/ or name clientside
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.name);
  });
});
function hostedHtml(input) {
  console.log(input);
  for (var i = 0; i < input.length; i++) {
    var html = `<li class="list-group-item" data-id=${input[i].id}>${
      input[i].title
    }

	<button
		class="li-btn"
		type="button"
		data-toggle="collapse"
		data-target="#hosted-${input[i].id}"
		aria-expanded="false"
		aria-controls="inputInfo-hosted">
		View Info
	</button>
</li>

	<div class="collapse" id="hosted-${input[i].id}">
		<div class="card card-body dropdown">
			<span>Theme: ${input[i].theme}</span>
			<span>Date: ${moment(input[i].date).format("dddd, MMMM Do YYYY")}</span>
			<span>Time: ${moment(input[i].time, "hh:mm:ss").format("h:mm a")}</span>
			<span>Location: ${input[i].location}</span>
			<hr />
			<span><button id=${input[i].id} class="li-btn-delete" data-id=${
      input[i].id
    }>Delete</button></span>
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
    type="button"
    data-toggle="collapse"
    data-target="#all-${input[i].id}"
    aria-expanded="false"
    aria-controls="inputInfo-allParties"
    >View Party</button>
  </li>

  <div class="collapse" id="all-${input[i].id}">
    <div class="card card-body dropdown">

      <!-- <p class="host-name">Host:{$input[i].name}</p> -->


      <p>Theme: ${input[i].theme}</p>
      <p>Location: ${input[i].location}</p>
      <p>Date: ${moment(input[i].date).format("dddd, MMMM Do YYYY")}</p>
      <p>Time: ${moment(input[i].time, "hh:mm:ss").format("h:mm a")}</p>
      <hr />
      <button id=${input[i].id} class="attend-btn li-btn" data-id=${
      input[i].id
    }>Attend Party</button>
    </div>
  </div>`;

    $(".allEvents-list").append(html);
  }
}

function upcomingParties(input) {
  // console.log(input);
  for (var i = 0; i < input.length; i++) {
    var html = `<li class="list-group-item" data-id=${input[i].id}> ${
      input[i].title
    }

	<button
		class="li-btn"
		type="button"
		data-toggle="collapse"
		data-target="#upcoming-${input[i].id}"
		aria-expanded="false"
		aria-controls="inputInfo-hosted">
		View Info
	</button>
</li>

	<div class="collapse" id="upcoming-${input[i].id}">
		<div class="card card-body dropdown">

      <!-- <p class="host-name">Host: ${input[i].name}</p> -->

			<span>Theme: ${input[i].theme}</span>
			<span>Date: ${moment(input[i].date).format("dddd, MMMM Do YYYY")}</span>
			<span>Time: ${moment(input[i].time, "hh:mm:ss").format("h:mm a")}</span>
			<span>Location: ${input[i].location}</span>
			<hr />
		<button id=${input[i].id} class="unAttend-btn li-btn" data-id=${
      input[i].id
    }>Unattend</button>
		</div>
	</div>
		`;

    $(".attendEvents").append(html);

    $(document).on("click", ".unAttend-btn", (e) => {
      console.log(e.target.id);
      console.log($(this));
      var id = e.target.id;
      console.log(id);
      $.ajax({
        url: "/api/unattend/" + id,
        method: "DELETE",
      }).then(() => {
        console.log("Deleted");
        window.location.reload();
      });
    });
  }
}

// who has the id of random
