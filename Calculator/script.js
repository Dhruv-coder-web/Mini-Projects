var input = document.getElementById("screen");
var buttons = document.querySelectorAll("button");

let expression = "";

let btn = Array.from(buttons);

btn.forEach((button) => {
    button.addEventListener("click", (e) =>{
        const value = e.target.innerHTML;
        switch(value){
            case'AC':
            AllClear();
            break;

            case'DEL':
            DeleteLetter();
            break;

            case'=':
            CalculateResult();
            break;

            default:
            appendValue(value);
        }
    });
});

var AllClear = ()=> {
    expression = "";
    input.value = expression;
}

var CalculateResult = () => {
    try{
        if(/[^0-9+\-*/(). ]/.test(expression))
        {
            input.value = "ERROR";
            expression = "";
            return;
        }

        const result = Function('"use strict"; return (' + expression + ') ')();
        expression = result.toString();
        input.value = expression;
    }
    catch{
        input.value = "ERROR";
        expression = "";
    }
};

var appendValue = (val) => {
    expression += val;
    input.value = expression;
}

var DeleteLetter = () => {
    expression = expression.slice(0,-1);
    input.value = expression;
}

document.addEventListener("keydown", (e) => {
    const allowedKeys = "0123456789-+/*()";
    if(allowedKeys.includes(e.key))
    {
        expression += e.key;
        input.value = expression;
    }
    else if(e.key == "Enter")
    {
        CalculateResult();
    }
    else if(e.key == "Backspace")
    {
        DeleteLetter();
    }
    else if(e.key.toLowerCase() == 'c')
    {
        AllClear();
    }
}); 