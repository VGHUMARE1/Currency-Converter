
let dropdown = document.querySelectorAll("select");
let URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let btn = document.querySelector(".btn button");
let form = document.querySelector("form");

for (select of dropdown) {
    for (country in countryList) {
        let option = document.createElement("option");
        option.innerText = country;
        option.value = country;
        select.append(option);
        if (select.name === "from" && country == "INR") {
            option.selected = true;
        }
        if (select.name === "to" && country == "USD") {
            option.selected = true;
        }
    }
}

for (select of dropdown) {
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

let updateFlag = (option) => {
    let currCode = option.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = option.parentElement.querySelector("img");
    img.src = newSrc;
    updateBtn();
    api();
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    api();
})

let api = async () => {
    let amount = document.querySelector("#input").value;
    let from = document.querySelector("#from").value.toLowerCase();
    let to = document.querySelector("#to").value.toLowerCase();
    let response = await fetch(`${URL}/${from}/${to}.json`);
    let secResponse = await response.json();
    let rate = secResponse[to];
    let finalAmount = rate * amount;
    let output = document.querySelector("#output");
    output.innerText = finalAmount;
}

window.addEventListener("load", () => {
    api();
});
