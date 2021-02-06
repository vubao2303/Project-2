$(document).ready(function() {
  // Getting references to our form and input

  var signUpForm = $("#signup"); 
  var emailInput = $("input#email-input");//Match to html id/classes later
  var passwordInput = $("input#password-input");//Match to html id/classes later
  var nameInput = // Fill in once html page comes

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("click", function(event) {
    event.preventDefault();
    console.log("Enter into Sign up form");
    var userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
     
    };

    if (!userData.name ||!userData.email || !userData.password) {
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

    // Bea-this will require a diffrent page 
      .then(function(data) {
        window.location.replace("/api/signin");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON); //match listener to html id/classes
    $("#alert").fadeIn(500); //match listener to html id/classes
  }
});
