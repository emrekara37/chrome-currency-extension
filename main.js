var txtDollarValue;
var txtEuroValue;
var apiDollarValue;
var apiEuroValue;
var dollarPositive = false;
var euroPositive = false;
var usdToTry;
var eurToTry;
const obj = {
    None : 0,
    Up :1,
    Down : 2
};
var objIconD;
var objIconE;
const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
const caretUp = `<svg aria-hidden="true" data-prefix="fas" data-icon="caret-up" class="svg-inline--fa fa-caret-up fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" style="width:35px;height:35px;" viewBox="0 0 320 512"><path fill="green" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>`;
const caretDown = `<svg aria-hidden="true" data-prefix="fas" data-icon="caret-down" class="svg-inline--fa fa-caret-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" style="width:35px;height:35px;"  viewBox="0 0 320 512"><path fill="red" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>`;
function getCurrency(currencyCode) {

    return new Promise(function (resolve, reject) {
        const url = `${cors_api_url}https://www.doviz.com/api/v1/currencies/${currencyCode}/latest`;
        var request = new XMLHttpRequest();
        if ("withCredentials" in request) {
            request.open('GET', url, true);
            request.setRequestHeader("Content-Type","application/json");
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            request.setRequestHeader("Access-Control-Allow-Origin","https://www.doviz.com");
            request.setRequestHeader("Accept","application/json");
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
        }
    
    });
}
function setDollarText() {
    usdToTry.innerHTML = txtDollarValue * apiDollarValue;
    if(objIconD !== obj.None){
        document.getElementById("icond").innerHTML = objIconD === obj.Up ? caretUp : caretDown;
    }
}
function setEuroText() {
    eurToTry.innerHTML = txtEuroValue * apiEuroValue;
    if(objIconE !== obj.None){
        document.getElementById("icond").innerHTML = objIconE === obj.Up ? caretUp : caretDown;
    }
}
function getBeforeDovizComApi(){
    fetch("https://free.currencyconverterapi.com/api/v6/convert?q=USD_TRY,EUR_TRY&compact=y").then(res=>res.json()).then(res=>{
        apiDollarValue = res.USD_TRY.val.toFixed(4);
        apiEuroValue = res.EUR_TRY.val.toFixed(4);
        eurToTry.innerHTML =apiEuroValue;
        usdToTry.innerHTML =apiDollarValue;
    })
}
window.addEventListener("load", () => {
    usdToTry = document.getElementById("usdTryValue");
    eurToTry = document.getElementById("euroTryValue");
    getBeforeDovizComApi();
    getCurrency("USD").then((res => {
        txtDollarValue = parseInt(document.getElementById("txtDollar").value);
        dollarPositive = res.change_rate > 0;
        if(dollarPositive && apiDollarValue < res.selling){
            objIconD = obj.Up;
        }   
        else if(dollarPositive == false && apiDollarValue > res.selling){
            objIconD = obj.Down;
        }else{
            objIconD = obj.None;
        }
        apiDollarValue = res.selling;
        setDollarText();
    }));
    getCurrency("EUR").then((res => {
        txtEuroValue = parseInt(document.getElementById("txtDollar").value);
        euroPositive = res.change_rate > 0;
        if(euroPositive && apiEuroValue < res.selling){
            objIconE = obj.Up;
        }   
        else if(euroPositive == false && apiEuroValue > res.selling){
            objIconE = obj.Down;
        }else{
            objIconE = obj.None;
        }
        apiEuroValue = res.selling;
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
