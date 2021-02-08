$(document).ready(function () {
	// Getting references to our form and input

	var signUpForm = $("#signup");
	var emailInput = $("#inputEmail");//Match to html id/classes later
	var passwordInput = $("#inputPassword");//Match to html id/classes later
	var nameInput = $("#inputName");

	// When the signup button is clicked, we validate the email and password are not blank
	signUpForm.on("click", function (event) {
		event.preventDefault();
		var userData = {
			name: nameInput.val().trim(),
			email: emailInput.val().trim(),
			password: passwordInput.val().trim(),

		};

		// if (!userData.name || !userData.email || !userData.password) {
		// 	return;
		// }

		// B- adding errors message 
		if (!userData.name ) {
      alert('Please enter your name to sign up.');
      return;
		}
		
		if (!userData.email) {
      alert('Please enter an email address to sign up.');
      return;
    }

    if (!userData.password) {
      alert('Please enter an password for your account.');
      return;
    }

		// If we have an email and password, run the signUpUser function
		signUpUser(userData.name, userData.email, userData.password);
		nameInput.val("");
		emailInput.val("");
		passwordInput.val("");

	});

	// Does a post to the signup route. If successful, we are redirected to the members page
	// Otherwise we log any errors
	function signUpUser(name, email, password) {
		$.post("/api/newuser", {
			name: name,
			email: email,
			password: password
		})

			// Bea-line41 change from /api/signin to /index
			.then(function (data) {
				window.location.replace("/index");
				// If there's an error, handle it by throwing up a bootstrap alert
			})
			.catch(handleLoginErr);
	}

	function handleLoginErr(err) {
		$("#alert .msg").text(err.responseJSON); //match listener to html id/classes
		$("#alert").fadeIn(500); //match listener to html id/classes
	}
});
