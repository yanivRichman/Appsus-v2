import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
        <section class="about-page app-main">
            <h3 class="about-page-text" ref="header">About us: <br> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor debitis atque repellendus perferendis libero iusto eligendi quae, consequatur modi officiis veniam dolorem omnis asperiores voluptatum eaque id impedit ab rem!</h3>
            <!-- <button @click="callBus">Call the bus!</button> -->
            <img v-bind:src="'./img/about.png'"/>
        </section>
    `,
    methods: {
        callBus() {
            // eventBus.$emit('puk');
            // eventBus.$emit('puk2');
        },
    },
    created() {
        console.log('Created');
    },
    mounted() {
        console.log('Mounted');
        console.log(this.$refs.header);
    },
};
