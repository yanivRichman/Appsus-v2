import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const MAILS_KEY = 'mails';

const gMails = [
    {
        id: 'e101',
        name: 'Yaron Biton',
        subject: 'Sprint3 review',
        body: 'Hi Revital and Yaniv, i have been review your sprint 3 and i hope that Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius. ',
        isRead: true,
        sentAt: getDate(1622234930594),
        to: 'yaronB@ca.com',
        isStar: true,
        isSent: false,
        isDraft: false
    },
    {
        id: 'e102',
        name: 'Matan Crispel',
        subject: 'Dropbox!!!',
        body: "Hi, don't forget DO NOT COPY YOUR GIT FOLDER TO THE DROPBOX Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius. ",
        isRead: true,
        sentAt: getDate(1620234930594),
        to: 'matanB@ca.com',
        isStar: false,
        isSent: false,
        isDraft: false
    },
    {
        id: 'e103',
        name: 'Adina Zwebner',
        subject: 'Sprint3 update',
        body: "Hi Revital and Yaniv, Please don't forget at 21:00 today a zoom meating and Lorem ipsum, dolor sit amet consectetur adipisicing elit.Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius.",
        isRead: false,
        sentAt: getDate(1618234930594),
        to: 'adinaZ@ca.com',
        isStar: false,
        isSent: true,
        isDraft: false
    },
    {
        id: 'e104',
        name: 'Ori Shemla',
        subject: 'Data is a function that ',
        body: 'Hi Did you know that Data is a function that return an object ? or that Data is a function that return an object ? and also that Data is a function that return an object ?',
        isRead: true,
        sentAt: getDate(1616234930594),
        to: 'oriSH@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
    {
        id: 'e105',
        name: 'Yaron Biton',
        subject: 'Sprint3 review',
        body: 'Hi Revital and Yaniv, i have been review your sprint 3 and i hope that Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius. ',
        isRead: false,
        sentAt: getDate(1614234930594),
        to: 'yaronB@ca.com',
        isSent: false,
        isStar: true,
        isDraft: false
    },
    {
        id: 'e106',
        name: 'Matan Crispel',
        subject: 'Dropbox!!!',
        body: "Hi, don't forget DO NOT COPY YOUR GIT FOLDER TO THE DROPBOX Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius. ",
        isRead: true,
        sentAt: getDate(1612234930594),
        to: 'matanB@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
    {
        id: 'e107',
        name: 'Adina Zwebner',
        subject: 'Sprint3 update',
        body: "Hi Revital and Yaniv, Please don't forget at 21:00 today a zoom meating and Lorem ipsum, dolor sit amet consectetur adipisicing elit.Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius.",
        isRead: false,
        sentAt: getDate(1610234930594),
        to: 'adinaZ@ca.com',
        isSent: true,
        isStar: true,
        isDraft: false
    },
    {
        id: 'e108',
        name: 'Ori Shemla',
        subject: 'Data is a function that ',
        body: 'Hi Did you know that Data is a function that return an object ? or that Data is a function that return an object ? and also that Data is a function that return an object ?',
        isRead: true,
        sentAt: getDate(1604133930594),
        to: 'oriSH@ca.com',
        isSent: false,
        isStar: true,
        isDraft: false
    },
    {
        id: 'e109',
        name: 'Yaron Biton',
        subject: 'Sprint3 review',
        body: 'Hi Revital and Yaniv, i have been review your sprint 3 and i hope that Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius. ',
        isRead: false,
        sentAt: getDate(1598133930594),
        to: 'yaronB@ca.com',
        isSent: true,
        isStar: true,
        isDraft: false
    },
    {
        id: 'e110',
        name: 'Matan Crispel',
        subject: 'Dropbox!!!',
        body: "Hi, don't forget DO NOT COPY YOUR GIT FOLDER TO THE DROPBOX Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius. ",
        isRead: true,
        sentAt: getDate(1594133930594),
        to: 'matanB@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
    {
        id: 'e111',
        name: 'Adina Zwebner',
        subject: 'Sprint3 update',
        body: "Hi Revital and Yaniv, Please don't forget at 21:00 today a zoom meating and Lorem ipsum, dolor sit amet consectetur adipisicing elit.Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius.",
        isRead: false,
        sentAt: getDate(1589133930594),
        to: 'adinaZ@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
    {
        id: 'e112',
        name: 'Ori Shemla',
        subject: 'Data is a function that ',
        body: 'Hi Did you know that Data is a function that return an object ? or that Data is a function that return an object ? and also that Data is a function that return an object ?',
        isRead: true,
        sentAt: getDate(1579133930594),
        to: 'oriSH@ca.com',
        isSent: false,
        isStar: true,
        isDraft: false
    },
    {
        id: 'e113',
        name: 'Yaron Biton',
        subject: 'Sprint3 review',
        body: 'Hi Revital and Yaniv, i have been review your sprint 3 and i hope that Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius. ',
        isRead: false,
        sentAt: getDate(1569133930594),
        to: 'yaronB@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
    {
        id: 'e114',
        name: 'Matan Crispel',
        subject: 'Dropbox!!!',
        body: "Hi, don't forget DO NOT COPY YOUR GIT FOLDER TO THE DROPBOX Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius. ",
        isRead: true,
        sentAt: getDate(1559133930594),
        to: 'matanB@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
    {
        id: 'e115',
        name: 'Adina Zwebner',
        subject: 'Sprint3 update',
        body: "Hi Revital and Yaniv, Please don't forget at 21:00 today a zoom meating and Lorem ipsum, dolor sit amet consectetur adipisicing elit.Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius.",
        isRead: false,
        sentAt: getDate(1556133930594),
        to: 'adinaZ@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
    {
        id: 'e116',
        name: 'Ori Shemla',
        subject: 'Data is a function that ',
        body: 'Hi Did you know that Data is a function that return an object ? or that Data is a function that return an object ? and also that Data is a function that return an object ?',
        isRead: true,
        sentAt: getDate(1553133930594),
        to: 'oriSH@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
        {
        id: 'e117',
        name: 'Yaron Biton',
        subject: 'Sprint3 review',
        body: 'Hi Revital and Yaniv, i have been review your sprint 3 and i hope that Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius. ',
        isRead: true,
        sentAt: getDate(1553133930594),
        to: 'yaronB@ca.com',
        isSent: false,
        isStar: true,
        isDraft: false
    },
    {
        id: 'e118',
        name: 'Matan Crispel',
        subject: 'Dropbox!!!',
        body: "Hi, don't forget DO NOT COPY YOUR GIT FOLDER TO THE DROPBOX Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius. ",
        isRead: true,
        sentAt: getDate(1553133930594),
        to: 'matanB@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
    {
        id: 'e119',
        name: 'Adina Zwebner',
        subject: 'Sprint3 update',
        body: "Hi Revital and Yaniv, Please don't forget at 21:00 today a zoom meating and Lorem ipsum, dolor sit amet consectetur adipisicing elit.Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius.",
        isRead: false,
        sentAt: getDate(1551133930594),
        to: 'adinaZ@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
    {
        id: 'e120',
        name: 'Ori Shemla',
        subject: 'Data is a function that ',
        body: 'Hi Did you know that Data is a function that return an object ? or that Data is a function that return an object ? and also that Data is a function that return an object ?',
        isRead: true,
        sentAt: getDate(1551133930594),
        to: 'oriSH@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
    {
        id: 'e121',
        name: 'Yaron Biton',
        subject: 'Sprint3 review',
        body: 'Hi Revital and Yaniv, i have been review your sprint 3 and i hope that Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius. ',
        isRead: false,
        sentAt: getDate(1551133930594),
        to: 'yaronB@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
    {
        id: 'e122',
        name: 'Matan Crispel',
        subject: 'Dropbox!!!',
        body: "Hi, don't forget DO NOT COPY YOUR GIT FOLDER TO THE DROPBOX Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius. ",
        isRead: true,
        sentAt: getDate(1551133930594),
        to: 'matanB@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
    {
        id: 'e123',
        name: 'Adina Zwebner',
        subject: 'Sprint3 update',
        body: "Hi Revital and Yaniv, Please don't forget at 21:00 today a zoom meating and Lorem ipsum, dolor sit amet consectetur adipisicing elit.Quae quod, id fugit quibusdam doloremque maiores harum tempora ipsam consectetur eos nobis quos totam corrupti laborum eligendi! Voluptate praesentium iste eius.",
        isRead: false,
        sentAt: getDate(1551133930594),
        to: 'adinaZ@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
    {
        id: 'e124',
        name: 'Ori Shemla',
        subject: 'Data is a function that ',
        body: 'Hi Did you know that Data is a function that return an object ? or that Data is a function that return an object ? and also that Data is a function that return an object ?',
        isRead: true,
        sentAt: getDate(1551133930594),
        to: 'oriSH@ca.com',
        isSent: false,
        isStar: false,
        isDraft: false
    },
];

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' };

_createmails();

export const mailService = {
    query,
    remove,
    save,
    getEmptyMail,
    getById,
    read,
    star,
    unReadToRead,
    classObject,
};

function classObject() {
    return 'envelop-close'
}

function query() {
    return storageService.query(MAILS_KEY);
}

function remove(mailId) {
    return storageService.remove(MAILS_KEY, mailId);
}

function save(mail) {
    if (mail.id) return storageService.put(MAILS_KEY, mail);
    else return storageService.post(MAILS_KEY, mail);
}

function read(mail) {
    mail.isRead = !mail.isRead;
    return storageService.put(MAILS_KEY, mail);
}

function star(mail) {
    mail.isStar = !mail.isStar;
    return storageService.put(MAILS_KEY, mail);
}

function unReadToRead(mail) {
    if (!mail.isRead) mail.isRead = true;
    return storageService.put(MAILS_KEY, mail);
}

function getEmptyMail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        name: 'Yaniv Richman',
        sentAt: getCurentDate(),
        isStar: false,
        isSent: true,
        isDraft: false
    };
}

function getById(mailId) {
    console.log('here getById');
    return storageService.get(MAILS_KEY, mailId);
}

function _createmails() {
    let mails = utilService.loadFromStorage(MAILS_KEY);
    if (!mails || !mails.length) {
        mails = gMails;
        utilService.saveToStorage(MAILS_KEY, mails);
    }
    return mails;
}

// function _createMail(subject, body) {
//     const mail = {
//         id: utilService.makeId(),
//         subject,
//         body,
//     };
//     return mail;
// }

function getDate(time) {
    const day = new Date(time).getDate();
    const month = parseInt(new Date(time).getMonth()) + 1;
    const year = new Date(time).getFullYear();
    if (year < 2021) {
        var fullDate = day + '/' + month + '/' + year;
    } else {
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        const monthStr = monthNames[month];
        var fullDate = monthStr + ',' + day;
    }
    return fullDate;
}

function getCurentDate() {
    const currTime = new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    return currTime;
}
