export default {
    template: `
        <div class="book-filter">
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search a book..">
            <label> | </label>
            <input @input="filter" v-model.number="filterBy.fromPrice" type="number" placeholder="From price...">
            <label> | </label>
            <input @input="filter" v-model.number="filterBy.toPrice" type="number" placeholder="To price...">
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: '',
                toPrice: Infinity,
            }
        };
    },
    methods: {
        filter() {
            // this.$emit('filtered', { ...this.filterBy });
            //deep copy
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    }
}