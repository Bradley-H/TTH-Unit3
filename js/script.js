const firstInput = document.getElementById("name");
const jobRole = document.getElementById("title");
const jobOptions = jobRole.querySelector('select');
const otherJobRole = document.querySelector('#other-job-role');
const themeSelect = document.querySelector('#design');
const themeOptions = themeSelect.querySelectorAll('select');
const colors = document.querySelector('#color');
const colorOptions = colors.querySelectorAll('option');
let cost = document.querySelector('#activities-cost');
const activities = Array.from(document.querySelectorAll("#activities-box input[data-cost"));
const payment = document.querySelector('#payment')
const paymentOptions = Array.from(payment.querySelectorAll('option'))
const methods = Array.from(document.querySelectorAll('.payment-methods div'));
//IIFE
(() => {
// setup
otherJobRole.style.display = "none"
colors.disabled = true
paymentOptions[1].selected = true
methods[9].hidden = true;
methods[10].hidden = true;



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

// 4. update the total and calculate the amount from each activity (+=).
let total = 0;
activities.forEach(itm => {
    itm.addEventListener('click', (e) => {
        const val = parseInt(itm.dataset.cost);
        const checked = itm.checked;
        if (checked) {
            total += val
        } else{
            total -= val;
        }
        cost.textContent = `Total: $${total}`
    })
})

// 5. 
    payment.addEventListener('change', () => {
        const hideAll = () => {
            methods.forEach(itm => {
                itm.hidden = true;
            })
        }
        const show = (...indicies) => {
            indicies.forEach(idx => {
                    methods[0].hidden = false;
                    methods[idx].hidden = false
            })
        }
        hideAll()
        if(payment.value === paymentOptions[1].value){
            show(1,2,3,4,5,6,7,8)
        }
        if(payment.value === paymentOptions[2].value){
            show(9)
        }
        if(payment.value === paymentOptions[3].value){
            show(10)
        }
    })
})()