
export default {
    // props: ['book'],
    template: `
    <form @submit.prevent="save">
    <fieldset class="form">
        <legend>Add Your Review:</legend>
        <input v-model.lazy="review.fullName" type="text" class="name-input" placeHolder="Please insert your full name"/>
        <textarea v-model.lazy="review.txt" class="form-control" id="review" rows="3" placeHolder="Add Your Review"></textarea>
        <div class="stars">
            <span v-for="num in 5" class="star-color" :class="{checked:num<=review.rate}" @click="changeColor(num)">⭐</span>
        </div>
        {{review.rate}}
    <button>Submit</button>
    </fieldset>
    </form >
`,
    data() {
        return {
            review: {
                txt: '',
                fullName: '',
                date: new Date().toDateString(),
                rate: 3
            }
        }
    },
    methods: {
        resetReview(){
            this.review = {
                txt: '',
                fullName: 'Books Reader',
                date: new Date().toDateString(),
                rate: 3
            }
        },
        save() {
            this.$emit('review', this.review)
            this.resetReview()
        },
        changeColor(num) {
            this.review.rate = num;
            console.log('hello', num)
        }


    }

}