import homePage from './pages/home-page.cmp.js';
import emailPage from './apps/mail/pages/mail-page.cmp.js';
import newMail from './apps/mail/pages/mail-new.cmp.js';
import keepPage from './apps/keep/pages/note-page.cmp.js';
import bookApp from './apps/Books/pages/book-app.cmp.js';


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/mail',
        component: emailPage
    },
    {
        path: '/mail/new/:mailId?',
        component: newMail
    },
    {
        path: '/keep',
        component: keepPage
    },
    {
        path: '/book',
        component: bookApp
    },
];

export const router = new VueRouter({ routes });
