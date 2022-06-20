const slider = document.getElementById("myRange");
const maxSliderValue = slider.getAttribute("max");
const price = document.querySelector('#price');
const view = document.querySelector('#pageviews');
const checkbox = document.querySelector('#toggle');
const btn = document.querySelector('#resetBtn');

let isChecked = false;


// data

const numsArr = ['8', '12', '16', '24', '36'];
const viewsArr = ['10K', '50K', '100K', '500k', '1M'];



// slider color change

const setSliderBg = function(e) {
    const { value, min, max } = e.target;
    const bgPercentage = ((value - min) / (max - min)) * 100;
    const color = `linear-gradient(90deg, hsl(174, 76%, 80%) ${bgPercentage}%, hsl(226, 68%, 95%) ${bgPercentage}%)`;
    slider.style.background = color;
};

const setNumbers = function(e) {

    const { value } = e.target;

    const currNumValue = numsArr[value - 1];

    const currViewValue = viewsArr[value - 1];


    price.textContent = validateChecked(currNumValue);
    view.textContent = `${currViewValue} pageviews`;
};

const validateChecked = (price) => isChecked ? `$${countDiscount(price)}.00` : `$${price}.00`;
const countDiscount = (price) => price - price * 0.25;


const applyDiscount = function(e) {
    const { checked } = e.target;
    const number = +price.textContent.slice(1);

    if (checked) {
        isChecked = true;
        price.textContent = `$${countDiscount(number)}.00`;
    } else {
        isChecked = false;
        price.textContent = `$${numsArr[slider.value - 1]}.00`;
    }
};

const reset = function() {
    const color = `linear-gradient(90deg, 
        hsl(174, 76%, 80%) 50%, 
        hsl(226, 68%, 95%) 50%)`;

    slider.value = 3;
    isChecked = false;
    checkbox.checked = false;
    slider.style.background = color;
    price.textContent = `$${numsArr[2]}.00`;
    view.textContent = `${viewsArr[2]} pageviews`;
};
// event

slider.addEventListener('input', (e) => {
    setSliderBg(e);
    setNumbers(e);
});

checkbox.addEventListener('click', applyDiscount);
btn.addEventListener('click', reset);
window.addEventListener('load', reset);