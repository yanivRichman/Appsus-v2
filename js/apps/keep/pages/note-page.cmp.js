import { noteService } from '../services/note-service.js'
import noteList from '../cmps/note-list.cmp.js'
import addNote from '../cmps/add-note.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'




export default {
    components: {
        noteList,
        addNote,
        noteFilter,
    },

    template: `
    <section v-if="notes" class="home-page" >
         <note-filter @filtered="setFilter"/>
         <add-note :noteEdit="noteEdit" @updateType="updateType" @submit="updatePage"/>
         <!-- <h3>{{noteEdit.cmpType}}</h3> -->

         <note-list v-model="notes" :notes="notesToShow" :pinnedNots="pinnedNots" @remove="removeNote" @updateBgc="updateNoteBgc" @submit="updatePage" @duplicate="duplicateNote" @pinNote="pinNote"  @markLine="markLine" @load="load"/>
         
    </section>
    `,

    data() {
        return {
            notes: null,
            pinnedNots: null,
            noteEdit: {
                type: 'text',
                placeholder: `What's on your mind...`,
                cmpType: 'note-txt',
            },
            filterBy: null,
            filteredBooks: null,
        }
    },

    created() {
        this.loadNotes();
        this.loadPinNotes();
    },

    methods: {

        markLine(todoTxt, id) {
            noteService.markTodoline(todoTxt, id);
            this.loadNotes();
            this.loadPinNotes();
        },

        setFilter(filterBy) {
            this.filterBy = filterBy
        },

        loadNotes() {
            noteService.query()
                .then(notes => this.notes = notes);
        },

        loadPinNotes() {
            noteService.pinedQuery()
                .then(notes => this.pinnedNots = notes);
        },

        load(){
            this.loadNotes();
            this.loadPinNotes();
        },


        removeNote(id) {
            noteService.removeNote(id)
                .then(() => {
                    this.loadNotes();
                })
                .catch(err => {
                    console.log('err', err);
                });
        },

        updatePage() {
            this.loadNotes();
            this.loadPinNotes();

        },

        updateNoteBgc(color, noteId) {
            noteService.updateNoteBgc(color, noteId)
                .then(() => {
                    this.loadNotes();
                    this.loadPinNotes();

                })
        },

        pinNote(noteId) {
            noteService.pinNote(noteId)
                .then(() => {
                    this.loadNotes();
                    this.loadPinNotes();

                })
        },

        duplicateNote(newNote) {
            noteService.duplicateNote(newNote)
                .then(() => {
                    this.loadNotes();
                    this.loadPinNotes();

                })
        },

        updateType(noteType) {
            switch (noteType) {
                case 'img':
                    this.noteEdit.type = 'text';

                    // this.noteEdit.type = 'URL';
                    this.noteEdit.placeholder = 'Enter Title,Enter image url...';
                    this.noteEdit.cmpType = 'note-video';

                    break;
                case 'vid':
                    this.noteEdit.type = 'text';

                    // this.noteEdit.type = 'URL';
                    this.noteEdit.placeholder = 'Enter Title,Enter video url...';
                    this.noteEdit.cmpType = 'note-img';

                    break;
                case 'todo':
                    this.noteEdit.type = 'text';
                    this.noteEdit.placeholder = 'Enter Title,Enter comma seperated list...';
                    this.noteEdit.cmpType = 'note-todos';
                    break;
                case 'txt':
                    this.noteEdit.type = 'text';
                    this.noteEdit.placeholder = 'Enter Title,Enter Text...';
                    this.noteEdit.cmpType = 'note-txt';
                    break;
            }
        },
        selectedToShow() {
            const selectedType = this.filterBy.select;
            if (selectedType === 'all') return this.notes;
            const filteredNotes = this.notes.filter(note => {
                return (note.type === selectedType && !note.isPinned)
            })
            return filteredNotes
        }
    },

    computed: {

        notesToShow() {
            if (!this.filterBy) return this.notes;
            let selectedNotes = this.selectedToShow();
            if (!this.filterBy.searchTerm) return selectedNotes;

            const searchStr = this.filterBy.searchTerm.toLowerCase();

            const filteredNotes = selectedNotes.filter(note => {
                if (note.type === 'note-txt') return ((note.info.txt).toLowerCase().includes(searchStr))
                else if (note.type !== 'note-text') return ((note.info.title).toLowerCase().includes(searchStr))
            })
            return filteredNotes
        },

    }
}