import { noteService } from '../services/note-service.js'


export default {
    props: ['noteEdit'],
    template: `
    <section class="add-note">
        <div class="add-note-warp flex align-center">
            <form @submit.prevent="saveNote">
            <input v-model="noteToEdit" :type="noteEdit.type" autocomplete="off" :placeholder="noteEdit.placeholder">
            </form>
            <div class="addw-btns">   
                <span class="icon txt" @click="updateNoteAdd('txt')"></span>
                <span class="icon vid" @click="updateNoteAdd('img')"></span>
                <span class="icon img" @click="updateNoteAdd('vid')"></span>
                <span class="icon todo" @click="updateNoteAdd('todo')"></span>
            </div>

        </div>
    </section>
    `,

    data() {
        return {
            noteToEdit: null,

        };
    },
    methods: {
        updateNoteAdd(noteType) {
            this.$emit('updateType', noteType)
        },

        saveNote() {
            noteService.saveNote(this.noteToEdit, this.noteEdit.cmpType)
                .then(() => {
                    this.$emit('submit')
                    this.noteToEdit = ''
                })

            // .then(note => this.$router.push('/keep'))
        }
    }

}