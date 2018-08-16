const API_URL = "https://free.currencyconverterapi.com/api/v6/convert?q=USD_TRY,EUR_TRY&compact=y";
var txtDollarValue;
var txtEuroValue;
var apiDollarValue;
var apiEuroValue;
function getCurrencies() {
    fetch(API_URL, { method: 'GET', mode: 'cors' }).then(res => res.json()).then((res) => {
        apiDollarValue = res.USD_TRY.val;
        apiEuroValue = res.EUR_TRY.val;
        txtDollarValue = parseInt(document.getElementById("txtDollar").value);
        txtEuroValue = parseInt(document.getElementById("txtEuro").value);
        setDollarText();
        setEuroText();
    });
}
function setDollarText() {
    const usdToTry = document.getElementById("usdTryValue");
    usdToTry.innerHTML = txtDollarValue * apiDollarValue;
}
function setEuroText() {
    const eurToTry = document.getElementById("euroTryValue");
    eurToTry.innerHTML = txtEuroValue * apiEuroValue;
}

window.addEventListener("load", () => {
    getCurrencies();
    document.getElementById("txtDollar").addEventListener("keyup", (e) => {
        if (e.target.value) {
            txtDollarValue = parseInt(e.target.value);
            setDollarText();
        }
    });
    document.getElementById("txtEuro").addEventListener("keydown", (e) => {
        if (!isNaN(e.target.value)) {
            txtDollarValue = e.target.value;
            setEuroText();
        }
    });
});
