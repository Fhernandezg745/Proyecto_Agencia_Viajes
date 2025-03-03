let formsRegister = document.forms.login
let inputsRegister = formsRegister.elements

inputsRegister.email.addEventListener("change", function(e) {
    let field = e.target.parentElement
    let value = e.target.value
    let feed = field.querySelector(".msg-error")
    let msg = null
    if(!validator.isEmail(value)){
        msg = "Debes ingresar una dirección de email válida"
    }

    if(msg){
        field.classList.remove("valid")
        field.classList.add("invalid")
        email.classList.remove("valid")
        email.classList.add("invalid")
        feed.innerText = msg
    } else {
        field.classList.remove("invalid")
        field.classList.add("valid")
        email.classList.remove("invalid")
        email.classList.add("valid")
        feed.innerText = " "
        let check = document.createElement("span");
        check.classList.add("fa-solid", "fa-circle-check");
        feed.appendChild(check); 
    }
});


inputsRegister.password.addEventListener("change", function(e) {
    let field = e.target.parentElement
    let value = e.target.value
    let feed = field.querySelector(".msg-error")
    let msg = null
    if(!validator.isLength(value,{min:1})){
        msg = "Por favor, colocar una contraseña"
    }

    if(msg){
        field.classList.remove("valid")
        field.classList.add("invalid")
        password.classList.remove("valid")
        password.classList.add("invalid")
        feed.innerText = msg
    } else {
        field.classList.remove("invalid")
        field.classList.add("valid")
        password.classList.remove("invalid")
        password.classList.add("valid")
        let check = document.createElement("span");
        check.classList.add("fa-solid", "fa-circle-check");
        feed.appendChild(check);
    }
});


formsRegister.addEventListener("submit", function(e){
    e.preventDefault()
    let isCorrect = false

    if(e.target.querySelectorAll(".labelFieldset.valid").length === 2){
        isCorrect = true
    }
    if(isCorrect){
        e.target.submit()
    } else{
        Swal.fire({
            title: "Error",
            text: "Por favor, revisa que todos los campos estén completos",
            icon: "error",
            confirmButtonColor: "#049473"
        })
    }
});

const showBtn = document.querySelector(".show");
function active_2(){
if(password.value != "")  {
    showBtn.style.display = "block";
    showBtn.onclick = function(){
        if(password.type == "password"){
          password.type = "text";
          this.textContent = "Hide";
          this.classList.add("active");
        }else{
          password.type = "password";
          this.textContent = "Show";
          this.classList.remove("active");
        }
      }
    }else{
      showBtn.style.display = "none";
    }
}
  