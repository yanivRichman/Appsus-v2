
export default {
    props: ['info'],
    template: ` 
        <section class="note n-vid">
             <iframe :src="info.url" title="video"></iframe>   
             <p>{{ info.title }}</p>
        </section>
        `,
}