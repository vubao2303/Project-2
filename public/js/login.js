$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $("#signin");
  var emailInput = $("#inputEmail");
  var passwordInput = $("#inputPassword");



  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("click", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    if (!userData.email) {
      alert('Please enter the email address for your account.');
      return;
    }

    if (!userData.password) {
      alert(`Please enter your account's password.`);
      return;
    }


    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });



  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/signin", {
      email: email,
      password: password
    })
      .then(function () {
        window.location.replace("/index");
        // If there's an error, log the error
      })
      .catch(function (err) {
        alert(`Email and password did not match. Please try again.`);
        console.log(err);
      });
  }
});
