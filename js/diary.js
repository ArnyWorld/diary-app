window.addEventListener("DOMContentLoaded",()=>{
    //Variables
    let inputNote = document.querySelector('#note');
    let buttonModal = document.querySelector('#btnModal');
    let notesArray = [];
    let tableNotes = document.querySelector('table');
    let alertNote = document.querySelector('.alert');
    let buttonAction = document.querySelector('#buttonAction');
    let buttonDelete = document.querySelector('#btnDelete');
    let  modal = document.querySelector('.modal');
    let  modalDelete = document.querySelector('#modalDelete');
    let sw=false;
    let index = 0;
    let alertForm = document.querySelector('#alert-form');
    let getArray = JSON.parse(localStorage.getItem("notes")) || [];
    tableNotes.addEventListener("click",(e)=>{
        let tr = e.target.parentNode.parentNode;
        let td = tr.querySelectorAll("td");
        let note = {
            name: td[0].textContent,
            date: td[1].textContent
        }

        if(e.target.id =="editNote"){
            console.log(note)
            filterNotes(note)
        }else if(e.target.id =="deleteNote"){
            filterNotes(note)
            let titleDelete = modalDelete.querySelector(".modal-body");
            titleDelete.textContent = note.name
        }
    })

    buttonModal.addEventListener("click",()=>{
        modal.querySelector(".modal-title").textContent = "Create Note";
        buttonAction.textContent = "Create";
        sw=true;
        clearForm();

    })

    buttonAction.addEventListener("click",actionNote);
    buttonDelete.addEventListener("click", deleteNote);

    
    function verifyNotes(){
        if(getArray.length == 0){
            tableNotes.classList.add("d-none");
            alertNote.classList.remove("d-none");
        }else{
            tableNotes.classList.remove("d-none");
            alertNote.classList.add("d-none");
          
        }
    }

    function actionNote(){
        let note={
            name: modal.querySelector("#name").value,
            date: modal.querySelector("#date").value
        }
        if(note.name.trim().length == 0 || note.date.trim().length == 0){
            alertForm.classList.remove("d-none")
            setTimeout(()=>{
                alertForm.classList.add("d-none")    
            },1500)
        }else if(sw){
            createNote(note);
        }else{
            modifyNote(note);
        }

        showNotes();
        showTable();
        verifyNotes();
    }


    function createNote(note){
        getArray.push(note);
        localStorage.setItem("notes", JSON.stringify(getArray));
    }
    function modifyNote(note){
        getArray[index].name = note.name;
        getArray[index].date = note.date;
        localStorage.removeItem("notes");
        localStorage.setItem("notes", JSON.stringify(getArray));
    }

    function filterNotes(e){
        sw=false;
        // let value = e.target.getAttribute("value");

         let noteFound = getArray.filter(note=>note.name == e.name);
         getNote(noteFound[0]);
         index = getIndex(noteFound[0]);

    }

    function getIndex(value){
        let index = getArray.findIndex(note=>note == value);
        return index;
    }

    function showNotes(){
        if(getArray.length!=0){
            tableNotes.classList.remove("d-none");
        }
    }

    function showTable(){
        let rows="";
        getArray.forEach(note=>{
            rows+=`<tr>
                <td>${note.name}</td>
                <td>${note.date}</td>
                <td><i id="editNote" value="${note.name}"  data-bs-toggle="modal"
                    data-bs-target="#exampleModal" class="fa-regular editNote fa-pen-to-square me-lg-5 me-1 text-success"></i>
                    <i id="deleteNote" value="${note.name}" data-bs-toggle="modal"
                    data-bs-target="#modalDelete" class="fa-regular deleteNote fa-trash-can text-danger"></i></td>
            </tr>`
        })
        tableNotes.querySelector("tbody").innerHTML = rows;
    }
    
    function getNote(note){
        modal.querySelector("#name").value = note.name;
        modal.querySelector("#date").value = note.date;
        buttonAction.textContent = "Editar";
        modal.querySelector(".modal-title").textContent = "Edit Note";
    }

    function deleteNote(){

        getArray.splice(index,1);
        localStorage.setItem("notes",JSON.stringify(getArray));
        showTable();
        verifyNotes();
    }

    function clearForm(){
        modal.querySelector("#name").value = ""
        modal.querySelector("#date").value = ""
    }

    showNotes();
    verifyNotes();
    showTable();
})