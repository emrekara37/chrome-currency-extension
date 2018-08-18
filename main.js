var txtDollarValue;
var txtEuroValue;
var apiDollarValue;
var apiEuroValue;
var dollarPositive = false;
var euroPositive = false;
function getCurrency(currencyCode) {

    return new Promise(function (resolve, reject) {
       const url = `https://www.doviz.com/api/v1/currencies/${currencyCode}/latest`;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.setRequestHeader("Access-Control-Allow-Origin","*");
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                const resp = request.response;
                resolve(JSON.parse(resp));
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
function getCurrencies() {
    

}
function setDollarText() {
 
    const usdToTry = document.getElementById("usdTryValue");
    usdToTry.innerHTML = txtDollarValue * apiDollarValue;
    const icon= `<i class="fa fa-caret-${dollarPositive ? "up up": "down down"}" style="margin-bottom:-5px;"></i>`;
    document.getElementById("icond").innerHTML =icon;
}
function setEuroText() {
   
    const eurToTry = document.getElementById("euroTryValue");
    const icon= `<i class="fa fa-caret-${euroPositive ? "up up": "down down"}" style="margin-bottom:-5px;"></i>`;
    eurToTry.innerHTML = txtEuroValue * apiEuroValue; 
    document.getElementById("icone").innerHTML =icon; 
}

window.addEventListener("load", () => {
    getCurrency("USD").then((res=>{
        txtDollarValue = parseInt(document.getElementById("txtDollar").value);
        apiDollarValue= res.selling;
        dollarPositive= res.change_rate > 0;
        setDollarText();
    }));
    getCurrency("EUR").then((res=>{
        txtEuroValue = parseInt(document.getElementById("txtDollar").value);
        apiEuroValue= res.selling;
        euroPositive = res.change_rate > 0;
        setEuroText();
    }));
    
    document.getElementById("txtDollar").addEventListener("keyup", (e) => {
        if (e.target.value) {
            txtDollarValue = parseInt(e.target.value);
            setDollarText();
        }
    });
    document.getElementById("txtEuro").addEventListener("keyup", (e) => {
        if (e.target.value) {
            txtEuroValue = parseInt(e.target.value);
            setEuroText();
        }
    });
  
});
