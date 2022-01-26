

export default {
    props: ['info', 'note'],
    template: ` 
        <section class="note n-todo">
            <h3>{{ info.title }}</h3>
            <ul class="todos">
                <li v-for="todo in info.todos" :class="{done: todo.isDone}" @click="markLine(todo, note.id)">{{ todo.txt }}</li>
            </ul>
        </section>
        `,

    methods: {
        markLine(todo, noteId) {
            this.$emit('markLine', todo, noteId)
        }
    },

}

