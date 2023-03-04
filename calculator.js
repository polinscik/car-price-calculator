import { modelList } from "./modelList.js";

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
