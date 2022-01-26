import longText from '../cmps/long-text.cmp.js';
import { mailService } from '../services/mail-service.js';


export default {
    props: ['mail'],
    template: `
        <div v-bind:class="classObject" class="mail-preview flex align-center">
            <p class="mail-name">{{mail.name}}</p>
            <div @click="unReadToRead(mail)" class="flex subject-body">
                <p class="mail-subject">{{mail.subject}}</p>
                <long-text :body="mail.body" class="mail-body"></long-text>
            </div>
            <p class="mail-sentAt">{{mail.sentAt}}</p>
        </div>
    `,
    data() {
        return{
            isActive: true,
            // isClicked: false
        }
    },
    components: {
        longText,
    },
    methods: {
        unReadToRead(mail) {
            mailService.unReadToRead(mail)
        },
    },
    computed: {
        classObject() {
            if (this.mail.isRead){
                return 'font-noraml'
            } else {
                return 'font-bold'
            }
        },
        click() {
           console.log('here')
        }
    },
};
