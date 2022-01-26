export default {
    template: `
        <div class="book-filter">
            <label>Search</label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search...">
            <label>From price</label>
            <input @input="filter" v-model.number="filterBy.fromPrice" type="number" placeholder="Search...">
            <label>To price</label>
            <input @input="filter" v-model.number="filterBy.toPrice" type="number" placeholder="Search...">
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: 0,
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