import { register } from "./funcs/auth.js";
const registerBtn = document.querySelector("#registerBtn");

registerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    register();
});
