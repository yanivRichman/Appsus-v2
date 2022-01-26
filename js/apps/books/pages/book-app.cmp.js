import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/event-bus-service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookDetails from './book-details.cmp.js';
import bookEdit from './book-edit.cmp.js';

export default {
    template: `
        <section class="book-app app-main">
            <book-filter @filtered="setFilter" />
            <book-list :books="booksToShow" @remove="removeBook" @selected="selectbook" />
            <book-details v-if="selectedBook" :book="selectedBook" @close="closeDetails" />
        </section>
    `,
    data() {
        return {
            books: [],
            selectedBook: null,
            filterBy: null
        };
    },
    created(){
        this.loadBooks();
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books =books);
        },
        removeBook(id) {
            bookService.remove(id)
            .then(() => {
                const msg = {
                    txt: 'Deleted succesfully',
                    type: 'success'
                };
                eventBus.$emit('showMsg', msg);
                this.loadBooks();
            })
            .catch(err => {
                console.log('err', err);
                const msg = {
                    txt: 'Error. Please try later',
                    type: 'error'
                };
                eventBus.$emit('showMsg', msg);
            });
        },
        selectbook(book) {
            this.selectedBook = book;
        },
        closeDetails() {
            this.selectedBook = null;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const searchStr = this.filterBy.title.toLowerCase();
            const minPrice = (this.filterBy.fromPrice) ? this.filterBy.fromPrice : 0
            const maxPrice = (this.filterBy.toPrice) ? this.filterBy.toPrice : Infinity
            const booksToShow = this.books.filter(book => {
                return book.title.toLowerCase().includes(searchStr) && book.listPrice.amount > minPrice && book.listPrice.amount < maxPrice;
            });
            return booksToShow;
        }
    },
    components: {
        bookList,
        bookFilter,
        bookDetails,
        bookEdit
    }
};