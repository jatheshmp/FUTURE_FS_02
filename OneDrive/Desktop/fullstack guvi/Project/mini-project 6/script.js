function Guvi(name, email, number, type) {
  this.name = name;
  this.email = email;
  this.number = number;
  this.type = type;
}

function Display() {}

// Validate
Display.prototype.validate = function (guvi) {
  console.log("validating");

  if (guvi.name.length < 2 || guvi.email.length < 5 || guvi.number.length < 2) {
    return false;
  }

  return true;
};

// Clear Form
Display.prototype.clear = function () {
  document.getElementById("registerform").reset();
};

// Add Table
Display.prototype.add = function (guvi) {
  let tableBody = document.getElementById("tableBody");

  let uilist = `
    <tr>
      <td>${guvi.name}</td>
      <td>${guvi.email}</td>
      <td>${guvi.number}</td>
      <td>${guvi.type}</td>
    </tr>
  `;

  tableBody.innerHTML += uilist;
};

// Show Message
Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById("message");

  message.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${displayMessage}
    </div>
  `;

  setTimeout(function () {
    message.innerHTML = "";
  }, 3000);
};

// Main
let guviForm = document.getElementById("registerform");

guviForm.addEventListener("submit", guviFormSubmit);

function guviFormSubmit(e) {
  e.preventDefault();

  console.log("form is getting submitted");

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let number = document.getElementById("number").value;

  let type = "";

  if (document.getElementById("male").checked) {
    type = document.getElementById("male").value;
  } else if (document.getElementById("female").checked) {
    type = document.getElementById("female").value;
  }

  let guvi = new Guvi(name, email, number, type);

  let display = new Display();

  if (display.validate(guvi)) {
    display.add(guvi);
    display.clear();
    display.show("success", "Registration Successful");
  } else {
    display.show("danger", "Please enter valid details");
  }
}
