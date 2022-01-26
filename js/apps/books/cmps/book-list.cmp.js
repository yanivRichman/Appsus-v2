import bookPreview from './book-preview.cmp.js';

export default {
    props: ['books'],
    template: `
        <ul class="book-list">
            <li v-for="book in books" :key="book.id" class="book-preview-container" >
                <book-preview :book="book" @click.native="log" />
                <div class="actions">
                    <button class="x-button" @click="remove(book.id)" >X</button>
                    <router-link :to="'/book/'+book.id" >Details</router-link>
                </div>
            </li>
        </ul>
    `,
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId);
        },
        log() {
            console.log('Logging.....');
        }
    },
    components:{
        bookPreview
    }
};