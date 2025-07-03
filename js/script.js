const firstInput = document.getElementById("name");
const jobRole = document.getElementById("title");
const otherJobRole = document.querySelector("#other-job-role");
const themeSelect = document.querySelector("#design");
const colors = document.querySelector("#color");
const colorOptions = colors.querySelectorAll("option");
let cost = document.querySelector("#activities-cost");
const activities = Array.from(
  document.querySelectorAll("#activities-box input[data-cost")
);
const payment = document.querySelector("#payment");
const paymentOptions = Array.from(payment.querySelectorAll("option"));
const methods = Array.from(document.querySelectorAll(".payment-methods div"));
const form = document.querySelector("form");
let isValid = true; // I'm assuming it's true

// setup
otherJobRole.style.display = "none";
colors.disabled = true;
paymentOptions[1].selected = true;
methods[9].hidden = true;
methods[10].hidden = true;

//1. focus on load
firstInput.focus();

//2. if select > option is 'other' than remove the hidden field from the other field
jobRole.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherJobRole.style.display = "block";
  } else {
    otherJobRole.style.display = "none";
  }
});

//3. disable any option[data-type] that doesn't have the same value as theme
themeSelect.addEventListener("change", (e) => {
  let target = e.target.value;
  colors.disabled = false;
  colorOptions.forEach((opt) => {
    if (opt.dataset.theme !== target) {
      opt.hidden = true;
    } else {
      opt.hidden = false;
    }
    //get the first option from the list after the filter.
    const firstPick = Array.from(colorOptions).find((opt) => !opt.hidden);
    if (firstPick) {
      colors.value = firstPick.value;
    }
  });
});

// 4. update the total and calculate the amount from each activity (+=).
let total = 0;
activities.forEach((itm) => {
  itm.addEventListener("click", (e) => {
    const val = parseInt(itm.dataset.cost);
    const checked = itm.checked;
    if (checked) {
      total += val;
    } else {
      total -= val;
    }
    activities.forEach((activity) => {
      if (
        activity !== itm &&
        activity.dataset.dayAndTime === itm.dataset.dayAndTime
      ) {
        activity.disabled = checked;
        activity.parentElement.classList.toggle("disabled", checked);
      }
    });
    cost.textContent = `Total: $${total}`;
  });
});

//6. Form Validation
const field = document.querySelector("fieldset");
const label = field.querySelectorAll("label");

//check email if valid //
const emailInput = label[1].querySelector("input");
const emailHint = label[1].querySelector("#email-hint");
const emailRegex = new RegExp(/^[^@\s]+@[^@\s]+\.[a-z]+$/i);
const digitRegex = new RegExp(/^\d+$/);

// 5. Payment Options
payment.addEventListener("change", () => {
  const hideAll = () => {
    methods.forEach((itm) => {
      itm.hidden = true;
    });
  };
  const show = (...indicies) => {
    indicies.forEach((idx) => {
      methods[0].hidden = false;
      methods[idx].hidden = false;
    });
  };
  hideAll();
  if (payment.value === paymentOptions[1].value) {
    show(1, 2, 3, 4, 5, 6, 7, 8);
  }
  if (payment.value === paymentOptions[2].value) {
    show(9);
  }
  if (payment.value === paymentOptions[3].value) {
    show(10);
  }
});

emailInput.addEventListener("keyup", () => {
  if (!emailRegex.test(emailInput.value)) {
    emailHint.classList.remove("hint");
    emailHint.parentElement.classList.add("not-valid");
    isValid = false;
  } else {
    emailHint.classList.add("hint");
    emailHint.parentElement.classList.add("valid");
    emailHint.parentElement.classList.remove("not-valid");
  }

  //  better error messages
  if (emailInput.value.trim() == "") {
    emailHint.textContent = "Please enter your Email";
    isValid = false;
  } else if (!emailRegex.test(emailInput.value)) {
    emailHint.textContent = "Not a valid email. Please try again";
    isValid = false;
  }
});

form.addEventListener("submit", (e) => {
  isValid = true; // reset validity at start
  const nameInput = label[0].querySelector("input");
  const namehint = label[0].querySelector("#name-hint");
  if (nameInput.value.trim().length === 0) {
    namehint.classList.remove("hint");
    namehint.parentElement.classList.add("not-valid");
    isValid = false;
  } else {
    namehint.classList.add("hint");
    namehint.parentElement.classList.remove("not-valid");
    nameInput.parentElement.classList.add("valid");
  }

  if (!emailRegex.test(emailInput.value)) {
    emailHint.classList.remove("hint");
    emailHint.parentElement.classList.add("not-valid");
    isValid = false;
  } else {
    emailHint.classList.add("hint");
    emailHint.parentElement.classList.add("valid");
    emailHint.parentElement.classList.remove("not-valid");
  }

  // at least one activity
  if (!activities.some((activity) => activity.checked)) {
    isValid = false;
  }

  // Only validate credit card fields if selected
  if (payment.value === "credit-card") {
    const CCRegex = new RegExp(/^\d{13,16}$/);

    const ccInput = document.querySelector("#cc-num");
    const ccHint = document.querySelector("#cc-hint");
    const CVV = document.querySelector("#cvv");
    const CVVHint = document.querySelector("#cvv-hint");
    const zipCode = document.querySelector("#zip");
    const zipHint = document.querySelector("#zip-hint");

    if (!CCRegex.test(ccInput.value)) {
      ccHint.classList.remove("hint");
      ccHint.parentElement.classList.add("not-valid");
      isValid = false;
    } else {
      ccHint.parentElement.classList.add("valid");
      ccHint.parentElement.classList.remove("not-valid");
      ccHint.style.display = "none  "
    }

    if (CVV.value.length < 3 || !digitRegex.test(CVV.value)) {
      CVVHint.classList.remove("hint"); 
      CVVHint.parentElement.classList.add("not-valid");
      isValid = false;
    } else {
      CVVHint.classList.add("hint");
      CVVHint.parentElement.classList.add("valid");
      CVVHint.parentElement.classList.remove("not-valid");
    }

    if (zipCode.value.length < 5 || !digitRegex.test(zipCode.value)) {
      zipHint.classList.remove("hint");
      zipHint.parentElement.classList.add("not-valid");
      isValid = false;
      zipHint.style.display = "block"

    } else {
      zipHint.parentElement.classList.add("valid");
      zipHint.parentElement.classList.remove("not-valid");
      zipHint.style.display = "none"
    }
  }

  // 7. ACTIVITY SECTION //
  activities.forEach((itm) => {
    itm.addEventListener("focus", () => {
      itm.parentElement.classList.add("focus");
    });
    itm.addEventListener("blur", () => {
      itm.parentElement.classList.remove("focus");
    });
  });

  if (!isValid) {
    e.preventDefault();
  }
});
