const API_URL = "https://free.currencyconverterapi.com/api/v6/convert?q=USD_TRY,EUR_TRY&compact=y";

function getCurrencies() {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open('GET', API_URL, true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                const response = JSON.parse(request.response);
                resolve(response);

            } else {
                reject(request);
            }
        };
        request.onerror = function (r) {
            reject(r);
        };
        request.send();
    });

}
function setCurrenciesText() {
    getCurrencies().then(currencies => {
        const usdToTry= document.getElementById("usd-to-try");
        const eurToTry= document.getElementById("eur-to-try");
        usdToTry.innerHTML = `1 $ = ${currencies.USD_TRY.val} ₺`;
        eurToTry.innerHTML = `1 € = ${currencies.EUR_TRY.val} ₺`;

    });

}
window.addEventListener("load",()=>setCurrenciesText());
