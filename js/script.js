const firstInput = document.getElementById("name");
const jobRole = document.getElementById("title");
const jobOptions = jobRole.querySelector('select');
const otherJobRole = document.querySelector('#other-job-role');
const themeSelect = document.querySelector('#design');
const themeOptions = themeSelect.querySelectorAll('select');
const colors = document.querySelector('#color');
const colorOptions = colors.querySelectorAll('option');
//IIFE
(() => {
// setup
otherJobRole.style.display = "none"
colors.disabled = true
//1. focus on load
firstInput.focus();


//2. if select > option is 'other' than remove the hidden field from the other field
jobRole.addEventListener("change", (e) => {
    if(e.target.value === 'other'){
        otherJobRole.style.display = "block"
    } else {
        otherJobRole.style.display = 'none'
    }
})

//3. disable any option[data-type] that doesn't have the same value as theme
themeSelect.addEventListener('change', (e) =>{
    let target = e.target.value;
    colors.disabled = false;
    colorOptions.forEach(opt => {
        if(opt.dataset.theme !== target){
            opt.hidden = true
        } else {
            opt.hidden = false
        }
        //get the first option from the list after the filter.
        const firstPick = Array.from(colorOptions).find(opt => !opt.hidden);
        if(firstPick){
            colors.value = firstPick.value
        }
    });
})

// 4.
})()