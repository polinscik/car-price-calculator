const modelList = {
    renault: [
        "Logan Stepway седан",
        "Logan седан",
        "Sandero хэтчбек",
        "Arkana кроссовер",
        "Kaptur кроссовер",
        "Duster кроссовер",
        "Sandero Stepway кроссовер",
        "Master фургон",
        "19",
        "Avantime",
        "Clio",
        "Clio RS",
        "Dokker",
        "Dokker Stepway",
        "Duster",
        "Espace",
        "Fluence",
        "Grand Scenic",
        "Kangoo",
        "Kangoo Z.E.",
        "Kaptur",
        "Koleos",
        "Laguna",
        "Latitude",
        "Logan",
        "Master",
        "Megane",
        "Megane RS",
        "Modus",
        "Safrane",
        "Sandero",
        "Sandero Stepway",
        "Scenic",
        "Sport Spider",
        "Symbol",
        "Trafic",
        "Twingo",
        "TWIZY",
        "Vel Satis",
    ],
    opel: [
        "Grandland X кроссовер",
        "Crossland кроссовер",
        "Zafira Life минивэн",
        "Vivaro минивэн",
        "Adam",
        "Adam Rocks",
        "Agila",
        "Antara",
        "Arena",
        "Astra",
        "Astra Family",
        "Astra OPC",
        "Calibra",
        "Campo",
        "Cascada",
        "Combo",
        "Corsa",
        "Corsa OPC",
        "Frontera",
        "GT",
        "Insignia",
        "Insignia Country Tourer",
        "Insignia OPC",
        "Karl",
        "Meriva",
        "Mokka",
        "Monterey",
        "Movano",
        "Omega",
        "Signum",
        "Sintra",
        "Speedster",
        "Tigra",
        "Vectra",
        "Vivaro",
        "Zafira",
        "Zafira OPC",
    ],
    mazda: [
        "6 седан",
        "CX-30 кроссовер",
        "CX-5 кроссовер",
        "CX-9 кроссовер",
        "CX-9 кроссовер",
        "121",
        "2",
        "3",
        "3 MPS",
        "323",
        "5",
        "6",
        "6 MPS",
        "626",
        "929",
        "Atenza",
        "AZ-1",
        "AZ-offroad",
        "AZ-wagon",
        "B-series",
        "Bongo",
        "BT-50",
        "Capella",
        "Carol",
        "Clef",
        "Cronos",
        "CX-3",
        "CX-5",
        "CX-7",
        "CX-9",
        "Demio",
        "E",
        "Eunos 500",
        "Eunos 800",
        "Eunos Cosmo",
        "Familia",
        "Lantis",
        "Laputa",
        "Levante",
        "Millenia",
        "MPV",
        "MX-3",
        "MX-5",
        "MX-6",
        "Navajo",
        "Premacy",
        "Revue",
        "Rustler",
        "RX-7",
        "RX-8",
        "Scrum",
        "Sentia",
        "Spiano",
        "Tribute",
        "Vantrend",
        "Xedos 6",
        "Xedos 9",
    ],
    jaguar: [
        "F-Type купе",
        "XE седан",
        "XF седан",
        "XJ седан",
        "E-Pace кроссовер",
        "I-Pace кроссовер",
        "F-Pace кроссовер",
        "F-Pace",
        "F-Type",
        "F-Type SVR",
        "S",
        "X-Type",
        "XE",
        "XF",
        "XFR",
        "XFR-S",
        "XJ",
        "XJ8",
        "XJR",
        "XK",
        "XK8",
        "XKR",
        "XKR-S",
    ],
};

const countBtn = document.getElementById("count");
const errorDiv = document.getElementById("error");
const dropDownList = document.getElementById("brand");
const dropDownModelList = document.getElementById("model");
const stateDiv = document.getElementById("state");

function addOption(option, parent) {
    const createdOption = document.createElement("option");
    createdOption.setAttribute("value", option);
    createdOption.innerText = option;
    parent.appendChild(createdOption);
}

modelList.renault.forEach((model) => {
    addOption(model, dropDownModelList);
});

countBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (checkAll()) {
        //фции на рассчет
        console.log("ok!");
    } else {
    }
});

function checkRadioInput(name) {
    let collection = document.getElementsByName(name);
    let arrayCollection = [...collection];
    let isValid = false;
    for (let input of arrayCollection) {
        if (input.checked) {
            isValid = true;
        }
    }
    return isValid;
}

function checkAll() {
    let isRadioValid = false;
    if (
        checkRadioInput("fuel") &&
        checkRadioInput("state") &&
        checkRadioInput("pay")
    ) {
        isRadioValid = true;
    } else {
        errorDiv.style.display = "block";
    }
    return isRadioValid;
}

//добавление списка моделей в зависимости от выбора пользователя
dropDownList.addEventListener("change", function () {
    const selectedValue =
        dropDownList.options[dropDownList.selectedIndex].value;

    dropDownModelList.replaceChildren(); //remove existing options in modellist

    switch (selectedValue) {
        case "Renault":
            modelList.renault.forEach((model) => {
                addOption(model, dropDownModelList);
            });
            break;
        case "Opel":
            modelList.opel.forEach((model) => {
                addOption(model, dropDownModelList);
            });
            break;
        case "Mazda":
            modelList.mazda.forEach((model) => {
                addOption(model, dropDownModelList);
            });
            break;
        case "Jaguar":
            modelList.jaguar.forEach((model) => {
                addOption(model, dropDownModelList);
            });
            break;
    }
});

const inputs = document.getElementsByTagName("input");
const inputsArray = [...inputs];
inputsArray.forEach(function (input) {
    input.addEventListener("focus", () => {
        errorDiv.style.display = "none";
    });
});

//on change новый/подержанный - вызвать кнопки с колвом владельцев
const newStateRadio = document.getElementById("newState");
const usedStateRadio = document.getElementById("usedState");
usedStateRadio.addEventListener("change", () => {
    createOwnersDiv();
});

newStateRadio.addEventListener("change", () => {
    document.getElementById("owners").remove();
});

function createOwnersDiv() {
    const newDiv = document.createElement("div");
    const newSelect = document.createElement("select");
    newSelect.setAttribute("id", "owners");
    newSelect.classList.add("owners");
    addOption("1-2 владельца", newSelect);
    addOption("3 владельца и более", newSelect);
    const label = document.createElement("label");
    label.setAttribute("for", "owners");
    label.innerText = "Укажите количество владельцев";
    stateDiv.after(newDiv);
    newDiv.appendChild(label);
    newDiv.appendChild(newSelect);
}
