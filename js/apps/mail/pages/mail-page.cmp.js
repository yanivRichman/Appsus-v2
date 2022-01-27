import { mailService } from '../services/mail-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import mailList from '../cmps/mail-list.cmp.js';
import mailFilter from '../cmps/mail-filter.cmp.js';

export default {
    template: `
    <section class="mail-page">
        <mail-filter @filtered="setFilter" />
        <div class="flex main-mail">
        <div class="email-menu-container flex-column">
            <router-link to="/mail/new" class="compose-btn compose-icon"> Compose</router-link>
            <button @click="setFilter({select:'isInbox',str:''})" class="email-menu inbox-icon"> Inbox</button>
            <button @click="setFilter({select:'isStar',str:''})" class="email-menu star-icon"> starred</button>
            <button @click="setFilter({select:'isSent',str:''})" class="email-menu sent-mail"> Sent</button>
            <button class="email-menu drafts-icon draft"> Drafts</button>
        </div>
       <mail-list class="mail-list" :mails="mailsToShow" @remove="removeMail"/>
</div>
    </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: null,
        };
    },
    created() {
        this.loadmails();
    },
    methods: {
        loadmails() {
            mailService.query().then((mails) => (this.mails = mails));
        },
        removeMail(id) {
            mailService
                .remove(id)
                .then(() => {
                    const msg = {
                        txt: 'Deleted succesfully',
                        type: 'success',
                    };
                    eventBus.$emit('showMsg', msg);
                    this.mails = this.mails.filter((mail) => mail.id !== id);
                })
                .catch((err) => {
                    console.log('err', err);
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error',
                    };
                    eventBus.$emit('showMsg', msg);
                });
        },
        setFilter(filterBy) {
            console.log('filterBy:',filterBy); 
//    filterBy: {
//     str: '',
//     select: 'all',
// }
            this.filterBy = filterBy;
        },
    },
    computed: {
        mailsToShow() {
            console.log(this.mails);
            if (!this.filterBy) return this.mails;
            const searchtStr = this.filterBy.str.toLowerCase();
            const isRead = this.filterBy.select;
            console.log('isRead:', isRead)
            const mailsToShow = this.mails.filter((mail) => {
                const strIsRead='' + mail.isRead;
                const strIsStar='' + mail.isStar;
                const strIsSent='' + mail.isSent;
                const strIsDraft='' + mail.isDraft;

                console.log('strIsStar', strIsStar)
                if (isRead === 'all' || isRead === 'isInbox') {
                    return (
                        mail.subject.toLowerCase().includes(searchtStr) ||
                        mail.body.toLowerCase().includes(searchtStr) ||
                        mail.name.toLowerCase().includes(searchtStr) )
                } else if (isRead === 'true' || isRead === 'false')  {
                    return (
                        mail.subject.toLowerCase().includes(searchtStr) ||
                        mail.body.toLowerCase().includes(searchtStr) ||
                        mail.name.toLowerCase().includes(searchtStr) )
                        && (isRead === strIsRead)
                } else if (isRead === 'isStar')  {
                    return (
                        mail.subject.toLowerCase().includes(searchtStr) ||
                        mail.body.toLowerCase().includes(searchtStr) ||
                        mail.name.toLowerCase().includes(searchtStr) )
                        && (strIsStar === 'true')
                } else if (isRead === 'isSent')  {
                    return (
                        mail.subject.toLowerCase().includes(searchtStr) ||
                        mail.body.toLowerCase().includes(searchtStr) ||
                        mail.name.toLowerCase().includes(searchtStr) )
                        && (strIsSent === 'true')
                } else if (isRead === 'isDraft')  {
                    return (
                        mail.subject.toLowerCase().includes(searchtStr) ||
                        mail.body.toLowerCase().includes(searchtStr) ||
                        mail.name.toLowerCase().includes(searchtStr) )
                        && (strIsDraft === 'true')
                } 
            });
            return mailsToShow;
        },
    },
    components: {
        mailList,
        mailFilter,
    },
};
