$(document).ready(function(){
  
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validateName(name) {
    const re = new RegExp('([a-zA-Z]+[_1-9]*[a-zA-Z]*){4,12}');
    return re.test(name);
  }

  function validatePassword(password) {
    const re = new RegExp('([a-zA-Z]*[1-9]*[a-zA-Z]*){6,18}');
    return re.test(password);
  }

  function validate() {
    const email = $("#email").val();
    const emailError = document.getElementById("emailError");

    const username = $("#username").val();
    const usernameError = document.getElementById("usernameError");

    const password = $("#password").val();
    const passwordError = document.getElementById("passwordError");

    const con_password = $("#confirm_password").val();
    const con_passwordError = document.getElementById("con_passwordError");


    let valid=true;

    if (validateEmail(email)) {
      emailError.classList.remove("visible");
      emailError.classList.add("hidden");
      emailError.setAttribute("aria-hidden", true);
      emailError.setAttribute("aria-invalid", false);
    } else {
      emailError.classList.remove("hidden");
      emailError.classList.add("visible");
      emailError.setAttribute("aria-hidden", false);
      emailError.setAttribute("aria-invalid", true);
      valid=false;
    }

    if (validateName(username)) {
      usernameError.classList.remove("visible");
      usernameError.classList.add("hidden");
      usernameError.setAttribute("aria-hidden", true);
      usernameError.setAttribute("aria-invalid", false);
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
    } else {
      passwordError.classList.remove("hidden");
      passwordError.classList.add("visible");
      passwordError.setAttribute("aria-hidden", false);
      passwordError.setAttribute("aria-invalid", true);
      valid=false;
    }

    if (password==con_password) {
      con_passwordError.classList.remove("visible");
      con_passwordError.classList.add("hidden");
      con_passwordError.setAttribute("aria-hidden", true);
      con_passwordError.setAttribute("aria-invalid", false);
    } else { 
      con_passwordError.classList.add("visible");
      con_passwordError.classList.add("invalid");
      con_passwordError.setAttribute("aria-hidden", false);
      con_passwordError.setAttribute("aria-invalid", true);
      valid=false;
    }
    if (valid) {
      GetInput(email, username, password);
      return true;
    }
    else
      return false;
  }
  $("#submit").on("click", validate);
});

async function GetInput(email, username, password) {
  const predavacInput = document.querySelector("#predavac");
  const predavac = predavacInput.value;
  let role;
  if(predavac)
    role="predavac";
  else
    role="korisnik";

  let user = {
      email: email,
      username: username,
      password: password,
      role: role
  };

  let newUser;

  try {
    newUser = await axios.post("api/register", user);
  } catch (err) {
      console.log(err);
  }
  window.location.href = "index.html";
};