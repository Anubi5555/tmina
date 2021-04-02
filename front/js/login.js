$(document).ready(function(){
  

  function validateName(name) {
    const re = new RegExp('([a-zA-Z]+[_1-9]*[a-zA-Z]*){4,12}');
    return re.test(name);
  }

  function validatePassword(password) {
    const re = new RegExp('([a-zA-Z]*[1-9]*[a-zA-Z]*){6,18}');
    return re.test(password);
  }

  function validate() {

    const username = $("#username").val();
    const usernameError = document.getElementById("usernameError");

    const password = $("#password").val();
    const passwordError = document.getElementById("passwordError");


    if (validateName(username)) {
      usernameError.classList.remove("visible");
      usernameError.classList.add("hidden");
      usernameError.setAttribute("aria-hidden", true);
      usernameError.setAttribute("aria-invalid", false);
      valid=true;
    } else {
      usernameError.classList.remove("hidden");
      usernameError.classList.add("visible");
      usernameError.setAttribute("aria-hidden", false);
      usernameError.setAttribute("aria-invalid", true);
      valid=false;
    }

    if (validatePassword(password)) {
      passwordError.classList.remove("visible");
      passwordError.classList.add("hidden");
      passwordError.setAttribute("aria-hidden", true);
      passwordError.setAttribute("aria-invalid", false);
      valid=true;
    } else {
      passwordError.classList.remove("hidden");
      passwordError.classList.add("visible");
      passwordError.setAttribute("aria-hidden", false);
      passwordError.setAttribute("aria-invalid", true);
      valid=false;
    }

    return false;
  }

  $("#submit").on("click", validate);

});



