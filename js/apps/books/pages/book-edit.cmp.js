import { bookService } from '../services/book-service.js';

export default {
    template: `
        <section class="book-edit">
            <h3>Add a new book</h3>
            <form @submit.prevent="save" >
                <input v-model="bookToEdit.title" type="text" placeholder="title">
                <input v-model.number="bookToEdit.price" type="number" placeholder="Price">
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            bookToEdit: bookService.getEmptybook()
        };
    },
    methods: {
        // save() {
        //     bookService.save(this.bookToEdit);
        //     this.bookToEdit = bookService.getEmptybook();
        // }
        save() {
            bookService.save(this.bookToEdit)
                .then(book => this.$router.push('/book'));
        }
    }
};