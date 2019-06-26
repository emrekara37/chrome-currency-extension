var apiDollarValue;
var apiEuroValue;
var usdToTry;
var eurToTry;
window.addEventListener("load", async () => {
    usdToTry = document.getElementById("usdTryValue");
    eurToTry = document.getElementById("euroTryValue");
    try {
        const response = await fetch("https://api.exchangeratesapi.io/latest?base=TRY");
        const data = await response.json();
        const { rates } = data;
        apiDollarValue = (1 / rates.USD).toFixed(4);
        apiEuroValue = (1 / rates.EUR).toFixed(4);
        eurToTry.innerHTML = apiEuroValue;
        usdToTry.innerHTML = apiDollarValue;
    } catch (e) {
        console.error(e);
    }
    function onKeyUp(type, val) {
        const value = val ? parseInt(val, 10) : 1;
        switch (type) {
            case "eur":
                eurToTry.innerHTML = (apiEuroValue * value).toFixed(4);
                break;

            case "usd":
                usdToTry.innerHTML = (apiDollarValue * value).toFixed(4);
                break;
        }
    }
    document.getElementById("txtDollar").addEventListener("keyup", (e) => {
        onKeyUp("usd", e.target.value);
    })
    document.getElementById("txtEuro").addEventListener("keyup", (e) => {
        onKeyUp("eur", e.target.value);
    })
});
