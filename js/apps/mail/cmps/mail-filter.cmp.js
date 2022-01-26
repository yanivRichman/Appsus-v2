export default {
    template: `
        <div class="mail-filter">
            <label>
                <input @input="filter" v-model="filterBy.str" class="filters-btn search-icon" type="text" placeholder="Search mail">
            </label>
            <select @change="onSelect" v-model="filterBy.select" class="filters-btn">
                       <option value="all">All</option>
                       <option value="true">Read</option>
                       <option value="false">Unread</option>
             </select>
        </div>
    `,
    data() {
        return {
            filterBy: {
                str: '',
                select: 'all',
            }
        };
    },
    methods: {
        onSelect(){
            this.$emit('filtered', {...this.filterBy})
        },
        filter() {
            this.$emit('filtered', { ...this.filterBy });
            //deep copy
            // this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    }
}