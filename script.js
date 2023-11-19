let password             = "";
let passwordLength     = 16
const inputPassword    = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl    = document.querySelector("#numbers-check");
const symbolCheckEl    = document.querySelector("#symbols-check");
const securityIndicatorBarEl      = document.querySelector("#security-indicator-bar");
const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "1234567890";
const symbolChars = "!@#$%&*()_-[]";

function GeneratePassword(){
    password = "";
    let chars  = "abcdefghijklmnopqrstuvwxyz";

    if(upperCaseCheckEl.checked)
        chars += upperCaseChars;

    if(numberCheckEl.checked)
        chars += numberChars;

    if(symbolCheckEl.checked)
        chars += symbolChars;


    for(let i= 0; i < passwordLength; i++){
       const randomNumber = Math.floor(Math.random()*chars.length);
       password += chars.substring(randomNumber, randomNumber+1);
    }

    inputPassword.value = password
    EvaluateStrength();
}

function EvaluateStrength(){
    const percent = Math.round( (passwordLength / 32) *
        5 +
        (Array.from(lowerCaseChars).some(char => password.includes(char)) ? 20 : 0) +
        (Array.from(upperCaseChars).some(char => password.includes(char)) ? 20 : 0) +
        (Array.from(numberChars).some(char => password.includes(char)) ? 25 : 0) +
        (Array.from(symbolChars).some(char => password.includes(char)) ? 30 : 0) )
    securityIndicatorBarEl.style.width= `${percent}%`

    if(percent > 69){
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.add('safe')
    }else if(percent > 50 ){
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('safe')
        securityIndicatorBarEl.classList.add('warning')
    }else{
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.remove('safe')
        securityIndicatorBarEl.classList.add('critical')
    }

    if(percent >= 100){
        securityIndicatorBarEl.classList.add('completed')
    }else{
        securityIndicatorBarEl.classList.remove('completed')
    }

}
function Copy(){
    navigator.clipboard.writeText(inputPassword.value)
}

const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", function(){
    passwordLength = passwordLengthEl.value
    document.querySelector("#password-length-text").innerText = passwordLength
    GeneratePassword()
})

upperCaseCheckEl.addEventListener("click",GeneratePassword)
numberCheckEl.addEventListener("click",GeneratePassword)
symbolCheckEl.addEventListener("click",GeneratePassword)

document.querySelector("#copy").addEventListener("click",Copy)
document.querySelector("#renew").addEventListener("click",GeneratePassword)

GeneratePassword()
