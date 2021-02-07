$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $("#signin");
  var emailInput = $("#inputEmail");
  var passwordInput = $("#inputPassword");
 var msg =$("#message")


  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("click", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
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
        console.log(err);
      });
  }; 


  function verifyPassword() {  
    //check empty password field  
    if(passwordInput == "") {  
       msg = "password cannot be empty";  
       return false;  
    }  
     
   //minimum password length validation  
    if(passwordInput.length < 4) {  
       msg = "**Password length must be atleast 8 characters";  
       return false;  
    }  
    
  //maximum length of password validation  
    if(passwordInput.length > 15) {  
      msg= "**Password length must not exceed 15 characters";  
       return false;  
    } else {  
       loginUser();  
    }  
  }  

});
