//MAIN JS
require('./modules/common');

let buttonTips = document.querySelectorAll('.calculator__tip-amount.fixed');

buttonTips.forEach( buttonTip => {
    buttonTip.addEventListener('click', e => {
        // Reset active button of tips
        resetActiveButton()
        let targetEl = e.target;
        let tipPercentage = parseFloat(e.target.innerText);
        validateTip(targetEl, tipPercentage);
    })
})

let buttonTipCustomized = document.querySelector(".calculator__tip-amount.custom");
buttonTipCustomized.addEventListener("blur", e => {
    if(e.target.value !=="") {
        resetActiveButton();
        let targetEl = e.target;
        let tipPercentage = parseFloat(e.target.value);
        validateTip(targetEl, tipPercentage);
    }
})

const validateTip = (targetEl, tipPercentage) => {
    let billInput = document.getElementById('bill-input').value;
    let peopleInput = document.getElementById('people-input').value;
    let billNum = parseFloat(billInput);
    let peopleNum = parseFloat(peopleInput);

    if(billInput !== "" && peopleInput !=="") {
        //Add active-button
        targetEl.classList.add("active-button");
        // changeResetButtonDesing()
        // Calculation 
        let totalTip = (billNum * tipPercentage) / 100;
        let perPersonTip = totalTip / peopleNum;
        let perPersonTotal = (totalTip + billNum) / peopleNum;
        //Insert calculation into DOM
        document.getElementById('calc-tip').textContent = `$ ${perPersonTip.toFixed(2)}`;
        document.getElementById('calc-total').textContent = `$ ${perPersonTotal.toFixed(2)}`;
    } else {
        if(billInput === "") {
            document.querySelector('#bill-text-error').className = "calculator__error-active"
        }else{
            removeBillErrorText()
        }
        if(peopleInput ==="") {
            document.querySelector('#people-text-error').className = "calculator__error-active"
        }else{
            removePeopleErrorText()
        }
    }
}

// Function to remove error text
function removeBillErrorText(){
    document.querySelector("#bill-text-error").className = "calculator__error-inactive";
}
function removePeopleErrorText(){
    document.querySelector("#people-text-error").className = "calculator__error-inactive";
}

// Reset active button desing
const resetActiveButton = () => {
    let activeButtons = document.querySelectorAll('.calculator__tip-amount');
    activeButtons.forEach(activeButton => {
        activeButton.classList.remove("active-button")
    })
}

// Onblur remove error text
document.getElementById("bill-input").onblur= function(){
    if(this.value !== ""){
        removeBillErrorText();
    }
}
document.getElementById("people-input").onblur= function(){
    if(this.value !== ""){
        removePeopleErrorText();
    }
}

//Add custom tip 
document.getElementById('custom-tip').onblur = function () {
    if(this.value !=="") {
        this.value = `${this.value}%`;
    }
}

// Script to only allow number values in text input field
setInputFilter(document.getElementById("custom-tip"), function(value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});

// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
}

//add button reset
let buttonReset = document.getElementById('reset-all');

buttonReset.onclick = function () {
    document.querySelector('form').reset()
    removeBillErrorText();
    removePeopleErrorText();
    resetActiveButton();
    //Reset output value
    document.getElementById('calc-tip').textContent = '$0.00'
    document.getElementById('calc-total').textContent = '$0.00'
}
