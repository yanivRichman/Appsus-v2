import { noteService } from '../services/note-service.js'
import noteTxt from './note-txt.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteImg from './note-img.cmp.js'
import noteVideo from './note-video.cmp.js'


export default {
    props: ['note'],
    components: {
        noteTxt,
        noteTodos,
        noteImg,
        noteVideo,
    },
    template: `
    <div class="note-preview flex space-around column">
        <components :is="note.type" :info="note.info" :note="note" @markLine="markLine"/>
    </div>
    `,

methods: {
        markLine(todoTxt,id){
            noteService.markTodoline(todoTxt, id)
            .then(this.$emit('load')
            )
        }
    }
}