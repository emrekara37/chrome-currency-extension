var apiDollarValue;
var apiEuroValue;
var usdToTry;
var eurToTry;
window.addEventListener("load", async () => {
    usdToTry = document.getElementById("usdTryValue");
    eurToTry = document.getElementById("euroTryValue");
    try {
        const response = await fetch("https://free.currencyconverterapi.com/api/v6/convert?q=USD_TRY,EUR_TRY&compact=y&apiKey=8d6d0cf9bced5ab31148");
        const data = await response.json();
        apiDollarValue = data.USD_TRY.val.toFixed(4);
        apiEuroValue = data.EUR_TRY.val.toFixed(4);
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
