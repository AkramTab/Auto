function validateForm() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";

  if (!email) {
    document.getElementById("emailError").textContent = "Email is required";
    return;
  }

  if (!password) {
    document.getElementById("passwordError").textContent = "Password is required";
    return;
  }

  document.getElementById("loginForm").submit();
}
