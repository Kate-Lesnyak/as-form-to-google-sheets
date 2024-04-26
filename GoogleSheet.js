// Learning Axis

// const scriptURL =
//   "https://script.google.com/macros/s/AKfycbynnQWm-Ijze3U8ZHx92r-8csblxPKqJ9I3qeQV4V8IbG67uuapoHVRqo4t-3e8Qi0S/exec";

// const scriptURL ='https://script.google.com/macros/s/AKfycbxCuYo3C2BpFxrJvHKeqx1_TCGjaR-Ky45e3XUpMs95ki17Ks4GjXQ91pEeagujkcb0/exec'

// const form = document.forms['contact-form']
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.btn.innerHTML = "Submitting...";
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    // .then((data) => data.json())
    .then(data => data.text())
    .then((response) => {
      // alert("Thank you! your form is submitted successfully.");
      e.target.btn.innerHTML = "Submit";
      document.getElementById("res").innerHTML = response;
      form.reset();
      setTimeout(() => {
        document.getElementById("res").innerHTML = "";
      }, 5000);
    })
    // .then(() => {
    //   window.location.reload();
    // })
    .catch((error) => console.error("Error!", error.message));
});
