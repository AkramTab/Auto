function validateForm() {
  const nome = document.getElementById("nome").value;
  const cognome = document.getElementById("cognome").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const indirizzo = document.getElementById("indirizzo").value;
  const telefono = document.getElementById("telefono").value;

  document.getElementById("nameError").textContent = "";
  document.getElementById("surnameError").textContent = "";
  document.getElementById("passwordError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("addressError").textContent = "";
  document.getElementById("numberError").textContent = "";
  
  if (!nome) {
    document.getElementById("nameError").textContent = "Name is required";
    return;
  }
  if (!cognome) {
    document.getElementById("surnameError").textContent = "Surname is required";
    return;
  }
  if (!password) {
    document.getElementById("passwordError").textContent = "Password is required";
    return;
  }
  if (!email) {
    document.getElementById("emailError").textContent = "Email is required";
    return;
  }
  if (!indirizzo) {
    document.getElementById("addressError").textContent = "Address is required";
    return;
  }
  if (!telefono) {
    document.getElementById("numberError").textContent = "Number is required";
    return;
  }

  document.getElementById("registrationForm").submit();
}

function redirectToLogin() {
  window.location.href = 'Login.html';
}
