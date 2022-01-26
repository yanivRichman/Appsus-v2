import notePreview from '../cmps/note-preview.cmp.js'
import editNote from '../cmps/edit-note.cmp.js'
import { noteService } from '../services/note-service.js'



export default {
    props: ['notes','pinnedNots'],
    components: {
        notePreview,
        editNote,
    },

    template: `
    <section class="note-list ">
    <div class="pinned-container">
        <div v-for="note in pinnedNots" :key="note.id">
            <div class="notes-preview-container" :style="{backgroundColor:note.style.bgc}">
                <div class="icon pin big"  @click="pinNote(note.id)" ></div>
                 <note-preview :note="note" @load="load"/>  
                <div class="note-footer flex space-around"> 
                    <div class="icon pin"  @click="pinNote(note.id)" ></div>
                    
                    <div class="icon palette" @click="openColors(note.id)"></div>
                    
                    
                    <div class="icon edit" @click="openEditor(note.id,note.info.title)"></div>
                    <form v-if="idEdit === note.id && isContantEdit" @submit.prevent="updateTitle">
                        <input  v-model="titleToEdit" type="text" >
                    </form>
                    
                    <div class="icon duplicate" @click="duplicateNote(note)"></div> 
                    <div class="icon trash" @click="remove(note.id)"></div>
                </div>
                <div v-if="idEdit === note.id && isColorEdit" class="colors-container">
                        <div class="colorsPalette" v-for="color in colors">
                              <button class="icon btnColor" @click="updateBgc(color,note.id)" :style="{backgroundColor:color}"></button>
                        </div>
                </div>
         </div>         
        </div>
        </div>

        <!-- flex space-between -->
        <div class="note-list-container ">
        <div v-for="note in notes" :key="note.id" class="note">
            
            <div class="notes-preview-container" :style="{backgroundColor:note.style.bgc}">
                 <note-preview :note="note" @load="load"/>  
                <div class="note-footer flex space-around"> 
                    <div class="icon pin" @click="pinNote(note.id)"></div>
                    
                    <div class="icon palette" @click="openColors(note.id)"></div>
                    
                    
                    <div class="icon edit" @click="openEditor(note.id,note.info.title)"></div>
                    
                    <div class="icon duplicate" @click="duplicateNote(note)"></div> 
                    <div class="icon trash" @click="remove(note.id)"></div>
                </div>
                <div v-if="idEdit === note.id && isColorEdit" class="colors-container">
                    <div class="colorsPalette" v-for="color in colors">
                        <button class="icon btnColor" @click="updateBgc(color,note.id)" :style="{backgroundColor:color}"></button>
                    </div>
                </div>
                <form v-if="idEdit === note.id && isContantEdit" @submit.prevent="updateTitle" class="title-input">
                    <input  v-model="titleToEdit" type="text" >
                </form>
         </div>         
</div>
        </div>
    </section>
    `,
    data() {
        return {
            colors: ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff',
                '#a0c4ff', '#bdb2ff', '#ffc6ff', '#fff'],
            idEdit: null,
            isColorEdit: false,
            isContantEdit: false,
            titleToEdit: null,

        }
    },

    methods: {
        load(){
            this.$emit('load')
        },
        
        remove(noteId) {
            this.$emit('remove', noteId)
        },

        updateBgc(color, id) {
            this.$emit('updateBgc', color, id)
            this.isColorEdit = false
        },

        openColors(id) {
            this.idEdit = id;
            this.isColorEdit = !this.isColorEdit;
            this.isContantEdit = false;
        },

        openEditor(id, txt) {
            this.idEdit = id;
            this.isContantEdit = !this.isContantEdit;
            this.isColorEdit = false;
            this.titleToEdit = txt
        },

        pinNote(id){
            this.$emit('pinNote',id)
        },

        updateTitle() {
            noteService.updateTitle(this.idEdit, this.titleToEdit)
                .then(() => {
                    this.$emit('submit')
                    this.titleToEdit = ''
                })
            this.isContantEdit = false
        },

        duplicateNote(note) {
            const newNote = { ...note }
            newNote.id = '';
            this.$emit('duplicate', newNote)
        }
    },


}