
// import { noteService } from "../services/note-service"


export default {
    props: ['note'],
    template: `
    <section class="edit-note">
        <div>
            <form @submit.prevent="updateNote">
            <input v-model="noteToEdit" :type="note.type" autocomplete="off" :placeholder="note.info.title">
            </form>
            <div>   
                <button @click="cancel(note.id)">Cancel</button>
                <!-- <button @click="updateNote">Update</button> -->
               
            </div>

        </div>
    </section>
    `,

    data() {
        return{
            noteToEdit:null,
        }
    },

    methods:{
        cancel(id){
            
        }
  
    },
}

