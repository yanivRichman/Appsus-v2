import longText from '../cmps/long-text.cmp.js';
import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/event-bus-service.js';
import reviewAdd from '../cmps/review-add.cmp.js';

export default {
    template: `
        <section v-if="book" class="book-details app-main">
           <div class="details-upper-section">
           <h4>Book Name : {{book.title}}</h4>
           <p>Page Count : {{pageCount}}</p>
           <p>Published Date : {{publishedDate}}</p>
           <p>Price : <span :class="priceClass">{{this.book.listPrice.amount}} {{this.book.listPrice.currencyCode}}</span></p>
           <img class="sale-img-modal" v-if="book.listPrice.isOnSale" src='././img/Sale-icon.png'/>
           <long-text :description="book.description"></long-text>
           <router-link class="next-prev-btns prev-btn" :to="'/book/'+prevBookId">< Prev book</router-link>
           <button @click="onClose" >Close</button>
           <router-link class="next-prev-btns next-btn":to="'/book/'+nextBookId">Next book ></router-link>
           </div>
           <review-add :book="book" @review="saveReview"/>
           </fieldset>
           <fieldset class="reviews">
               <legend>Book Reviews:</legend>
       <div class="review-display"  v-for="(review, idx) in book.reviews" :key="review.id">
       <p><span>Review: </span>{{review.txt}}</p>
       <a class="close-btn" @click="removeReview(idx)">x</a>
       <p><span>Published date:</span> {{review.date}}</p>
       <p><span>Full Name: </span>{{review.fullName}}</p>
       <p><span>Rate: </span>{{review.rate}}</p>
       </div>
       </fieldset >
        </section>
    `,
        components: {
            longText,
            reviewAdd
        },
    data() {
        return {
            book: null,
            nextBookId: null,
            prevBookId: null,
        };
    },
    created() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId)
            .then(book => this.book = book);
    },
    methods:{
        onClose(){
            this.$router.push('/book')
        },
        saveReview(review) {
            bookService.addReview(review,this.book.id)
                .then(book => this.book = book)
                .then(() => {
                    const msg = {
                        txt: `Book review to:  ${this.book.title} was succsessfuly Added!`,
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
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

        removeReview(idx) {
            this.book.reviews.splice(idx, 1)
            bookService.save(this.book)
                .then(() => {
                    const msg = {
                        txt: `Review was remove`,
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
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
    },
	watch: {
		'$route.params.bookId': {
			handler() {
				const { bookId } = this.$route.params;
				bookService.getById(bookId).then((book) => (this.book = book));
				bookService.getNextBookId(bookId).then((bookId) => (this.nextBookId = bookId));
				bookService.getPrevBookId(bookId).then((bookId) => (this.prevBookId = bookId));
			},
			immediate: true
		}
	},

    // watch: {
    //     '$route.params.bookId': {
    //         handler() {
    //             const { bookId } = this.$route.params;
    //             console.log(this, this.nextBookId, this.prevBookId)
    //             bookService.getById(bookId)
    //                 .then(book => this.book = book);
    //             // if (this.prev) {
    //                 bookService.getNextBookId(bookId)
    //                     .then(bookId => this.nextBookId = bookId);
    //             // } else if (this.prevPress) {
    //                 // bookService.getPrevBookId(bookId)
    //                 //     .then(bookId => this.prevBookId = bookId);
    //             // }
    //         },
    //         immediate: true
    //     },
    //     '$route.params.bookId': {
    //         handler() {
    //             const { bookId } = this.$route.params;
    //             console.log(this, this.nextBookId, this.prevBookId)
    //             bookService.getById(bookId)
    //                 .then(book => this.book = book);
    //             // if (this.nextPress) {
    //             //     bookService.getNextBookId(bookId)
    //             //         .then(bookId => this.nextBookId = bookId);
    //             // } else if (this.prevPress) {
    //                 bookService.getPrevBookId(bookId)
    //                     .then(bookId => this.prevBookId = bookId);
    //             // }
    //         },
    //         immediate: true
    //     },
    // },
    // watch: {
    //     '$route.params.bookId': {
    //         handler() {
    //             const { bookId } = this.$route.params;
    //             console.log(this, this.nextBookId, this.prevBookId)
    //             bookService.getById(bookId)
    //                 .then(book => this.book = book);
    //             // if (this.nextPress) {
    //                 bookService.getNextBookId(bookId)
    //                     .then(bookId => this.nextBookId = bookId);
    //             // } else if (this.prevPress) {
    //                 // bookService.getPrevBookId(bookId)
    //                 //     .then(bookId => this.prevBookId = bookId);
    //             // }
    //         },
    //         immediate: true
    //     },
    // },
    computed: {
        pageCount() {
            const pageCount = this.book.pageCount
            if (pageCount > 500) return 'Long reading'
            if (pageCount > 200) return 'Decent Reading'
            if (pageCount < 100) return 'Light Reading'
            return pageCount
        },
        publishedDate() {
            const publishedDate = this.book.publishedDate
            if (2021 - publishedDate > 10) return 'Veteran Book'
            if (2021 - publishedDate < 1) return 'New!'
            return publishedDate
        },
        priceClass(){
            const price = this.book.listPrice.amount
            if (price > 150) return 'red'
            if (price < 20) return 'green'
            return price
        }, 
        isSale(){
            const isSale = this.book.listPrice.isOnSale
            if (isSale) return 'Yes Yes Yes !!!'
            return 'No'
        }
    }
}