let notesContainer = document.querySelector(".notes-container")
let createBtn = document.querySelector(".btn")
let notes = document.querySelectorAll(".input-box")

function getStorage(){
    notesContainer.innerHTML= localStorage.getItem("notes");
}
getStorage();
function updateStorage(){
    localStorage.setItem("notes",notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
  let para= document.createElement("p");
  let del= document.createElement("img");

  para.className = "input-box";
  para.setAttribute("contenteditable", "true");
  del.src= "images/delete.png";
  notesContainer.appendChild(para).appendChild(del);
  updateStorage();
})

notesContainer.addEventListener("click", function (e) {
    if(e.target.tagName=== "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    // else if(e.target.tagName=== "P") {
    //     notes = document.querySelectorAll(".input-box")
    //     notes.forEach (e => {
    //       e.onkeyup= function(){
    //         updateStorage();
    //       }
    //     })   
    // }
})
//ALTERNATE METHOD 
notesContainer.addEventListener("keyup", function(e){
    if(e.target.classList.contains("input-box")){
        updateStorage();
    }
})