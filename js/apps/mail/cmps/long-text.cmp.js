export default {
    props: ['body'],
    template: `
      <p @click="isExpand=!isExpand"><span>- </span>{{textForDisplay}}
        <span v-if="!isExpand">...</span>
      </p>
    `,
    created() {
        if (this.body.length < 100) this.isExpand = true
    },
    data() {
        return {
            isExpand: false
        }
    },
    computed: {
        textForDisplay() {
            if (this.body.length > 100 && !this.isExpand) {
                return this.body.slice(0, 100)
            }
            else if (this.isExpand || this.body.length < 100) return this.body
        }
    }
}