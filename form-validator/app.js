const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//SHOW INPUT ERROR MESSAGE:
function showError(valinput, message) {
  const formControl = valinput.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//SHOW INPUT SUCCESS MESSAGE:
function showSuccess(valinput) {
  const formControl = valinput.parentElement;
  formControl.className = "form-control success";
}

//CHECK EMAIL IS VALID
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//CHECK REQUIRED FIELDS
function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//CHECK INPUT LENGTH
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//CHECK IF PASSWORDS MATCH
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwrods do not match");
  }
}

//GET FIELD NAME
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//EVENT LISTENERS
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);

  //-----REMOVED TO IMPLEMENT CLEANER DRY CODE----//
  // if (username.value === "") {
  //   showError(username, "Username is required");
  // } else {
  //   showSuccess(username);
  // }
  // if (email.value === "") {
  //   showError(email, "Email is required");
  // } else if (!isValidEmail(email.value)) {
  //   showError(email, "Email is not valid");
  // } else {
  //   showSuccess(email);
  // }
  // if (password.value === "") {
  //   showError(password, "Password is required");
  // } else {
  //   showSuccess(password);
  // }
  // if (password2.value === "") {
  //   showError(password2, "Password is required");
  // } else {
  //   showSuccess(password2);
  // }
});
