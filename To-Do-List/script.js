const searchBox = document.getElementById("search-Box");
const searchBtn = document.getElementById("search-btn");
const listContainer = document.getElementById("list-Container");

function addTask(task) {
    if (task=== '') {
        alert("Please add your task first");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = searchBox.value;
        listContainer.appendChild(li);
        let span=document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span);
        
    }
    searchBox.value="";
    saveData();
}

searchBtn.addEventListener("click", () => {
  addTask(searchBox.value);
  saveData();
})

listContainer.addEventListener("click", function (e) {
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked")
        saveData()
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
})

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();