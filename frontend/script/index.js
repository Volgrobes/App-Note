console.log("Hello");

const backnotes= () => {
    axios.get("/api/notes").then((response) => {
      const notes = response.data;
      console.log(notes)
      displayNotes(notes);
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayNotes(notes) {
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = "";
  
    notes.forEach((note) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${note.title}: ${note.content}`;
      notesList.appendChild(listItem);
    });
}

const createnote = () => {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    axios.post("/api/notes", {title, content}).then((response) => {

      })
      .catch((error) => {
        console.error(error);
      });
}

const button = document.getElementById("Button")
button.addEventListener("click", createnote)
backnotes()
