import { storageService } from '../../../services/async-storage-service.js';
import { utilService } from '../../../services/util-service.js';


export const noteService = {
    query,
    getNoteById,
    removeNote,
    saveNote,
    updateNoteBgc,
    updateTitle,
    save,
    duplicateNote,
    pinedQuery,
    markTodoline,
    pinNote,
}


const NOTES_KEY = 'notes';
_createNotes()

function query() {
    // return notes;
    return storageService.query(NOTES_KEY);

}

function markTodoline(todoLine,id) {
    return getNoteById(id) 
    .then(note =>{
       const todos= note.info.todos
      var todo = todos.find(todo=>(todo.txt=== todoLine.txt))
        todo.doneAt = Date.now;
        todo.isDone = !todo.isDone;
        return save(note);
    })
    
}

function pinedQuery() {
    return storageService.query(NOTES_KEY)
    .then(notes =>{
       var pinnedNotes = notes.filter(note =>{
            return note.isPinned
        })
        return pinnedNotes
    })

}
// function getEmpthyNote() {
//     return {
//         id: '',
//         isPinned: false,
//         type: '',
//         info: {},
//         style: {
//             backgroundColor: '#fff'
//         }

//     }
// }

function duplicateNote(newNote) {
    return save(newNote);
}

function pinNote(noteId) {
    return getNoteById(noteId)
    .then(note => {
        note.isPinned = !note.isPinned
        return save(note)
    })
}

function updateTitle(noteId,title) {
    return getNoteById(noteId)
    .then(note => {
        if (note.type !== 'note-txt') note.info.title = title;
        else note.info.txt = title;
        return save(note)
    })   
}

function updateNoteBgc(color, noteId) {
    return getNoteById(noteId)
    .then(note => {
        note.style.bgc = color
        return save(note)
    })
}


function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note);
    else return storageService.post(NOTES_KEY, note);
}

function saveNote(noteVal, cmpType) {
    let newNote = {
        isPinned: false,
        type: cmpType,
        info: getNoteInfo(noteVal, cmpType),
        style: {
            bgc: '#fff'
        }
    }

    return storageService.post(NOTES_KEY, newNote);
}

function getNoteInfo(noteVal, cmpType) {
    if (cmpType === 'note-txt') return { txt: noteVal };
    else if (cmpType === 'note-img' || cmpType === 'note-video') return getTitleAndUrl(noteVal);
    else if (cmpType === 'note-todos') return getTodos(noteVal);
    // {
    //     var todos = getTodos(noteVal)
    //     return { todos }
    //     console.log('todos', todos);
    // }
}

function getTitleAndUrl(noteVal) {
    let words = noteVal.split(',', 1);
    let noteTitle = words[0]
    let noteUrl = noteVal.slice(noteTitle.length)
    return { title: noteTitle, url: noteUrl }
}

function getTodos(todosVal) {
    let todos = todosVal.split(',')
    let noteTitle = todos.shift();
    let formatedTodos = todos.map((todo, idx) => {
        return { txt: todo, doneAt: null }
    })
    return { title: noteTitle, todos: formatedTodos };
}

function removeNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}

function getNoteById(id) {
    return storageService.get(NOTES_KEY, id);
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = [
           
            {
                id: "n102",
                type: "note-img",
                isPinned: false,
                isEdit: false,
                info: {
                    url: "img/cute.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    bgc: "#ffadad"
                }
            },
            {
                id: "n109",
                type: "note-todos",
                isPinned: false,
                isEdit: false,
                info: {
                    label: "Get my stuff together",
                    title: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null ,isDone: false},
                        { txt: "Coding power", doneAt: 187111111 ,isDone: true }
                    ]
                },
                style: {
                    bgc: "#cddafd"
                }
            },
            {
                id: "n104",
                type: "note-video",
                isPinned: false,
                isEdit: false,
                info: {
                    title: "CSS",
                    url: "https://www.youtube.com/embed/CG__N4SS1Fc",
                },
                style: {
                    bgc: "#ffd6a5"
                }
            },
            {
                id: "n105",
                type: "note-video",
                isPinned: false,
                isEdit: false,
                info: {
                    title: "cute vid",
                    url: "https://www.youtube.com/embed/h6PVe1YBQh4",
                },
                style: {
                    bgc: "a0c4ff"
                }
            },
            {
                id: "n106",
                type: "note-img",
                isPinned: false,
                isEdit: false,
                info: {
                    url: "https://yesno.wtf/assets/yes/2-5df1b403f2654fa77559af1bf2332d7a.gif",
                    title: "Great gif"
                },
                style: {
                    bgc: "#ffadad"
                }
            },
            {
                id: "n107",
                type: "note-txt",
                isPinned: false,
                isEdit: false,
                info: {
                    txt: "last time I slept? new Date('July 05, 2020').getTime()"
                },
                style: {
                    bgc: "#9bf6ff"
                }
            },
            {
                id: "n108",
                type: "note-img",
                isPinned: false,
                isEdit: false,
                info: {
                    url: "https://memegenerator.net/img/instances/54494224/what-if-full-stack-developer-just-means-do-everything-including-fixing-the-floor-printer.jpg",
                    title: "meme"
                },
                style: {
                    bgc: "#fff"
                }
            },
            {
                id: "n101",
                type: "note-txt",
                isPinned: false,
                isEdit: false,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    bgc: "#b7e4c7"
                }
            },
            {
                id: "n103",
                type: "note-todos",
                isPinned: true,
                isEdit: false,
                info: {
                    label: "TO DO LIST",
                    title: "TO DO LIST",
                    todos: [
                        { txt: "make lists", doneAt: null ,isDone: false},
                        { txt: "look at lists", doneAt: 187111111 ,isDone: false },
                        { txt: "PANIC!", doneAt: 187111111 ,isDone: false }
                    ]
                },
                style: {
                    bgc: "#ffd6a5"
                }
            },
            
        ];
        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes;
}

