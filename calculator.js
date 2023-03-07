"use strict";
import { modelList } from "./modelList.js";

const countBtn = document.getElementById("count");
const errorDiv = document.getElementById("error");
const dropDownList = document.getElementById("brand");
const dropDownModelList = document.getElementById("model");
const stateDiv = document.getElementById("state");
const engineInput = document.getElementById("engineSize");
const priceDiv = document.getElementById("priceDiv");

function addOption(option, parent) {
    const createdOption = document.createElement("option");
    createdOption.setAttribute("value", option);
    createdOption.innerText = option;
    parent.appendChild(createdOption);
}

modelList.Renault.forEach((model) => {
    addOption(model.name, dropDownModelList);
});

countBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    getFuelPrice();
    if (checkAll() && checkFuel()) {
        priceDiv.style.display = "block";
        priceDiv.innerText = `Примерная цена автомобиля - ${getPrice()} руб.`;
        //фции на рассчет
        console.log("ok!");
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
            modelList.Renault.forEach((model) => {
                addOption(model.name, dropDownModelList);
            });
            break;
        case "Opel":
            modelList.Opel.forEach((model) => {
                addOption(model.name, dropDownModelList);
            });
            break;
        case "Mazda":
            modelList.Mazda.forEach((model) => {
                addOption(model.name, dropDownModelList);
            });
            break;
        case "Jaguar":
            modelList.Jaguar.forEach((model) => {
                addOption(model.name, dropDownModelList);
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

function checkFuel() {
    if (
        engineInput.value < engineInput.min ||
        engineInput.value > engineInput.max
    ) {
        errorDiv.style.display = "block";
        errorDiv.innerText = "Объем двигателя введен неверно.";
        return false;
    } else return true;
}

engineInput.addEventListener("focus", () => {
    if (errorDiv.innerText == "Объем двигателя введен неверно.") {
        errorDiv.style.display = "none";
    }
});

function getPrice() {
    const selectedBrand =
        dropDownList.options[dropDownList.selectedIndex].value;
    const selectedModel =
        dropDownModelList.options[dropDownModelList.selectedIndex].value;
    const selectedModelIndex = dropDownModelList.selectedIndex;
    let price = modelList[selectedBrand][selectedModelIndex].price;
    price = Number(price) + getFuelPrice();
    console.log(price);
    return price;
}

function getCheckedInput(name) {
    let collection = document.getElementsByName(name);
    let arrayCollection = [...collection];
    let checkedValue;
    for (let input of arrayCollection) {
        if (input.checked) {
            checkedValue = input.id;
        }
    }
    return checkedValue;
}

function getFuelPrice() {
    const checkedFuel = getCheckedInput("fuel");
    let additionalPrice;
    switch (checkedFuel) {
        case "petrol":
            additionalPrice = 0;
            break;
        case "diesel":
            additionalPrice = 50000;
            break;
        case "gas":
            additionalPrice = 100000;
            break;
        case "electricity":
            additionalPrice = 200000;
            break;
    }
    return additionalPrice;
}
