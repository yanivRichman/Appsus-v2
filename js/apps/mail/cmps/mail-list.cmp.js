import mailPreview from './mail-preview.cmp.js';
import { mailService } from '../services/mail-service.js';


export default {
    props: ['mails','heading'],
    template: `
    <section class="mail-list">
        <ul>
            <li v-for="mail in mails" :key="mail.id" class="mail-preview-container flex align-center" >
                    <mail-preview :mail="mail"/>
                    <div v-if="!mail.isStar" class="icon star-icon right-icons star-black" @click="star(mail)"></div>
                    <div v-if="mail.isStar" class="icon star-icon right-icons star-gold" @click="star(mail)"></div>
                    <div v-if="!mail.isRead" class="icon envelop-close right-icons" @click="read(mail)"></div>
                    <div v-if="mail.isRead" class="icon envelop-open right-icons" @click="read(mail)"></div>
                    <div class="icon trash right-icons" @click="remove(mail.id)" ></div>
            </li>
        </ul>
    </section>
    `,
    created(){
    },
    data() {
        return {
            isActive:true
        }
    },
    methods: {
        read(mail) {
            mailService.read(mail)
        },
        remove(mailId) {
            this.$emit('remove', mailId);
        },
        star(mail) {
            mailService.star(mail)
        },

    },
    components:{
        mailPreview
    }
};