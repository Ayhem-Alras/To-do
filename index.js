const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const counterSpan = document.getElementById("count");

function addToDoList() {
  const inputValue = inputBox.value.trim();

  if (inputValue === "") {
    alert("Du musst etwas eingeben!");
  } else {
    const li = document.createElement("li");
    li.textContent = inputValue;
    li.addEventListener("click", toggleTask);

    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = "&times;";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", function () {
      li.remove();
      updateCounter();
    });

    li.appendChild(deleteButton);
    listContainer.appendChild(li);
    inputBox.value = "";

    inputBox.focus();
    updateCounter();
  }
}

function toggleTask() {
  this.classList.toggle("checked");
  updateCounter(); // Zähler aktualisieren, wenn eine Aufgabe angeklickt wird
}

function updateCounter() {
  const checkedItems = document.querySelectorAll("li.checked").length;
  counterSpan.textContent = checkedItems;
}

inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addToDoList();
  }
});

const currentTimeFooter = document.getElementById("current-time-footer");

function updateCurrentTimeFooter() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  currentTimeFooter.textContent = `Current Time: ${hours}:${minutes}:${seconds}`;
}

setInterval(updateCurrentTimeFooter, 1000);
updateCurrentTimeFooter();

let timeoutId;

function toggleTask() {
  this.classList.toggle("checked");
  clearTimeout(timeoutId); // Vorhandenen Timer löschen
  timeoutId = setTimeout(updateCounter, 100); // Timer mit Verzögerung starten
}
