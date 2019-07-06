var usd;
var euro;
var spanUsd;
var spanEuro;
window.addEventListener("load", async () => {
    spanUsd = document.getElementById("usd");
    spanEuro = document.getElementById("euro");
    try {
        const response = await fetch("https://api.exchangeratesapi.io/latest?base=TRY");
        const data = await response.json();
        const { rates } = data;
        usd = (1 / rates.USD).toFixed(4);
        euro = (1 / rates.EUR).toFixed(4);
        spanEuro.innerHTML = euro;
        spanUsd.innerHTML = usd;
    } catch (e) {
        console.error(e);
    }
    const getInputValue = (val) => (val ? parseInt(val, 10) : 1);
    document.getElementById("txtUsd").addEventListener("keyup", ({ target: { value } }) => {
        spanUsd.innerHTML = (usd * getInputValue(value)).toFixed(4);
    });
    document.getElementById("txtEuro").addEventListener("keyup", ({ target: { value } }) => {
        spanEuro.innerHTML = (euro * getInputValue(value)).toFixed(4);
    });
});
