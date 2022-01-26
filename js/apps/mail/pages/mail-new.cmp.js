import { mailService } from '../services/mail-service.js';

export default {
    template: `
        <section class="new-mail app-main ">
            <form v-if="newMail" @submit.prevent="save" class="flex-column">
                <p class="New-Message">New Message</p>
                <input v-model="newMail.to" type="text" placeholder="To:">
                <input v-model="newMail.subject" type="text" placeholder="Subject:">
                <textarea ows="4" cols="50" class="new-mail-body" v-model="newMail.body"></textarea>
                <button class="send-btn">Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            newMail: null
        };
    },
    created() {
        const { mailId } = this.$route.params;
        if (mailId) {
            mailService.getById(mailId)
                .then(mail => this.newMail = mail);
        } else {
            this.newMail = mailService.getEmptyMail();
        }
    },
    methods: {
        save() {
            mailService.save(this.newMail)
                .then(mail => this.$router.push('/mail/'));
        }
    }
};