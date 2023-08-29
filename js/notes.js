const notesBtn = document.getElementById('notes-btn'); // Button to create new notes

const notes = JSON.parse(localStorage.getItem('notes')); // Parsing the saved notes in localstorage

if (notes) {
    notes.forEach(note => {
        addNewNote(note);
    })
}

// Adding 'click' event listener on 'notesBtn'
notesBtn.addEventListener('click', () => {

    addNewNote();
});

// Creating new note
function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
    <i class="bi bi-save-fill"></i>
    <i class="bi bi-trash-fill"></i>
    <p class="note-body" contenteditable="true" spellcheck="false">${text}</p>
    `;

    // Saving individual note by adding 'click' event listener on 'bi-save-fill' icon
    note.querySelector('.bi-save-fill').addEventListener('click', () => {

        updateLocalStorage();
    })

    // Deleting individual note by adding 'click' event listener on 'bi-trash-fill' icon
    note.querySelector('.bi-trash-fill').addEventListener('click', () => {

        note.remove();

        updateLocalStorage();
    })

    // Displaying the newly created note in the 'notes-content' area
    document.getElementById('notes-content').appendChild(note);
}

// Updating local storage
function updateLocalStorage() {
    const notes = [];

    document.querySelectorAll('.note-body').forEach(note => {
        notes.push(note.innerHTML);
    });

    localStorage.setItem('notes', JSON.stringify(notes)); // Saving the notes into the localstorage as JSON Strings
}