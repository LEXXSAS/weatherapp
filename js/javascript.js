// const APIKey = "a27e708ed6e1f554f65bc96cd622ce99";
    
// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&lang=ru&APPID=${APIKey}`)

const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");

let api;
// const apiKey = "a27e708ed6e1f554f65bc96cd622ce99";

inputField.addEventListener("keyup", e => {
    if(e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if(inputField.value != "") {
        requestApi(inputField.value);
    }
});

// locationBtn.addEventListener("click", () => {
//     if(navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(onSuccess, onError);
//     } else {
//         alert("Ваш браузер не поддерживает геолокацию");
//     }
// });

const apiKey = "a27e708ed6e1f554f65bc96cd622ce99";
function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&APPID=${apiKey}`;
    fetchData();
}

// function onSuccess(position) {
//     const {latitude, longitude} = position.coords;
//     api = `https://api.openweathermap.org/data/3.0/weather?lat=${latitude}&lon=${longitude}&lang=ru&units=metric&appid=${apiKey}`;
//     fetchData();
// }

function onError(error) {
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add("error");
}


function fetchData() {
    infoTxt.innerHTML = "Получение деталей погоды...";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result)).catch(() => {
        infoTxt.innerText = "Что-то пошло не так";
        infoTxt.classList.replace("pending", "error");
    });
}
 
function weatherDetails(info) {
    infoTxt.classList.replace("pending", "error");
    if(info.cod == "404") {
        infoTxt.innerHTML = `${inputField.value} неправильное название города`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if(id == 800) {
            wIcon.src = "img/clear.svg";
        } else if(id >= 200 && id >= 232) {
            wIcon.src = "img/storm.svg";
        } else if(id >= 600 && id >= 622) {
            wIcon.src = "img/snow.svg";
        } else if(id >= 701 && id >= 781) {
            wIcon.src = "img/haze.svg";
        } else if(id >= 801 && id >= 804) {
            wIcon.src = "img/cloud.svg";
        } else if(id >= 300 && id >= 321) {
            wIcon.src = "img/rain.svg";
        }

        wrapper.querySelector(".temp .numb").innerHTML = Math.floor(temp);
        wrapper.querySelector(".weather").innerHTML = description;
        wrapper.querySelector(".location span").innerHTML = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerHTML = `${humidity}%`;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        // console.log(info);
    }
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});
