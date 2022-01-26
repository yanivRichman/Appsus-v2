export default {
    props: ['book'],
    template: `
        <div class="book-preview">
            <img class="sale-img" :src=sale> 
            <p>{{book.title}}</p>
            <img v-bind:src="book.thumbnail">               
            <p :class="price">{{book.listPrice.amount}}{{currencyIcon}}</p>
        </div>
    `,
    computed: {
        price() {
            if (this.book.listPrice.amount > 150) return 'red'
            if (this.book.listPrice.amount < 20) return 'green'
        },
        sale() {
            if (this.book.listPrice.isOnSale === true) return '././img/Sale-icon.png'
        },
        currencyIcon() {
            const currencyCode = this.book.listPrice.currencyCode
            if (currencyCode === 'ILS') return '₪'
            if (currencyCode === 'USD') return '$'
            if (currencyCode === 'EUR') return '€'
        },
    }
}