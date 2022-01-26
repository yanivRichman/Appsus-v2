
export default {
    template: `
        <section class="note-filter">
            <div class="search flex space-between">
                <form @submit.prevent="filter">  
                   <input v-model.lasy="filterBy.searchTerm"  type="search" id="noteSearch" name="noteSearch" placeholder="Search note" autocomplete="off"> 
                </form>
                   <select @change="onSelect" v-model="filterBy.select">
                       <option value="all">All</option>
                       <option value="note-img">Image</option>
                       <option value="note-video">Video</option>
                       <option value="note-todos">List</option>
                       <option value="note-txt">Text</option>
                    </select>
            </div>
        </section>
    `,

    data(){
        return {
            filterBy: {
                searchTerm: null,
                select: 'all',
            },
        }
    },

    methods: {
        onSelect(){
            this.$emit('filtered', {...this.filterBy})
        },
        filter() {
            console.log('filterBy', this.filterBy);
            this.$emit('filtered', {...this.filterBy})
        }
    },
}