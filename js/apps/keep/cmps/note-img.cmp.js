

export default {
    props: ['info'],
    template: ` 
        <section class="note n-img">
            <img :src="info.url"/>
            <p>{{info.title}}</p>
        </section>
        `,
}
