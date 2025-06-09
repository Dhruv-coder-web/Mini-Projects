let date = document.getElementById("date");
let btn = document.querySelector(".btn");
let result = document.querySelector(".result");

let calculateAge = () => {
    const birthdate = date.value;
    if(birthdate === "")
    {
        alert("Enter your Birth Date");
    }
    else
    {
        const age = getAge(birthdate);
        result.innerText = `You are ${age} ${age > 1 ? "Years" : "Year"} old`;
    }
}

let getAge = (birthdate) => {
    const currentDate = new Date();
    const BirthDate = new Date(birthdate);
    let age = currentDate.getFullYear() - BirthDate.getFullYear();
    let month = currentDate.getMonth() - BirthDate.getMonth();

    if(month < 0 || month === 0 && currentDate.getDate() < BirthDate.getDate())
    {
        age--;
    }
    if(BirthDate.getFullYear() > currentDate.getFullYear())
    {
        alert("Your Age is not valid");
    }
    return age;
}

btn.addEventListener("click", calculateAge);