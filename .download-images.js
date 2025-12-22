const fs = require('fs');
const https = require('https');
const path = require('path');

const urls = [
    "https://instagram.fmlg11-1.fna.fbcdn.net/v/t51.29350-15/445783585_912651883968983_5537065403820144913_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=instagram.fmlg11-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2QFQd-HHKX6-299IfjBcyXcKURJ8tu8J53MC2WcIb1iM4d5tVq0il90_xcrmJrqIkFQ&_nc_ohc=IlHxiziOtEgQ7kNvwHBifqm&_nc_gid=TUd3yFfPN78OMwFXshXc4A&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Afm0AeaOts-tJxfSHcMDTJ-tw1pb-xRds9mjJdAKH5aNWQ&oe=694AF652&_nc_sid=8b3546",
    "https://instagram.fmlg11-1.fna.fbcdn.net/v/t51.29350-15/118669912_122279732675088_3384029198241192216_n.jpg?stp=dst-jpg_e35_tt6&_nc_ht=instagram.fmlg11-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QFQd-HHKX6-299IfjBcyXcKURJ8tu8J53MC2WcIb1iM4d5tVq0il90_xcrmJrqIkFQ&_nc_ohc=TPyFUFbNGY0Q7kNvwFAduYB&_nc_gid=TUd3yFfPN78OMwFXshXc4A&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfnfrGhghgi-Vj0R6aYpdDdDMxuJRaiVpO3xXFnD2E2l-A&oe=694B18B0&_nc_sid=8b3546",
    "https://instagram.fmlg11-1.fna.fbcdn.net/v/t51.2885-15/590403180_18538662214038667_734216103084555711_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=instagram.fmlg11-1.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2QFQd-HHKX6-299IfjBcyXcKURJ8tu8J53MC2WcIb1iM4d5tVq0il90_xcrmJrqIkFQ&_nc_ohc=iHgcU8UPT3sQ7kNvwG4Gnl-&_nc_gid=TUd3yFfPN78OMwFXshXc4A&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfkOq-w5BnSrZZXVTPWTFj1HRVah8aQteIwgu2JEYriHMQ&oe=694AFD92&_nc_sid=8b3546",
    "https://instagram.fmlg11-1.fna.fbcdn.net/v/t51.2885-15/591167712_18537585799038667_1127867217596887298_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=instagram.fmlg11-1.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2QFQd-HHKX6-299IfjBcyXcKURJ8tu8J53MC2WcIb1iM4d5tVq0il90_xcrmJrqIkFQ&_nc_ohc=bKHEHPuaQGkQ7kNvwHur6vR&_nc_gid=TUd3yFfPN78OMwFXshXc4A&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfkN6Mhxk-KlJg2CdocVijO6h99bXZ0bZ7CTIUZj9J_knA&oe=694B0DC7&_nc_sid=8b3546",
    "https://instagram.fmlg11-1.fna.fbcdn.net/v/t51.2885-15/588723204_1345793377301397_2367318872438268767_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.fmlg11-1.fna.fbcdn.net&_nc_cat=109&_nc_oc=Q6cZ2QFQd-HHKX6-299IfjBcyXcKURJ8tu8J53MC2WcIb1iM4d5tVq0il90_xcrmJrqIkFQ&_nc_ohc=s9CvV5Btn8kQ7kNvwE8FdDR&_nc_gid=TUd3yFfPN78OMwFXshXc4A&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfmU64gDA2zEjZhdYt8VPEGriXa0ifDjkvktYna-29-k9Q&oe=694B18E7&_nc_sid=8b3546",
    "https://instagram.fmlg11-1.fna.fbcdn.net/v/t51.2885-15/587006797_18535637356038667_5892151079239575304_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=instagram.fmlg11-1.fna.fbcdn.net&_nc_cat=107&_nc_oc=Q6cZ2QFQd-HHKX6-299IfjBcyXcKURJ8tu8J53MC2WcIb1iM4d5tVq0il90_xcrmJrqIkFQ&_nc_ohc=kdPMqHo9AHoQ7kNvwHAYSQ6&_nc_gid=TUd3yFfPN78OMwFXshXc4A&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfmPRwi14didDXet0XOuAAxX43Crv4zxJqRzXrue68Yfcw&oe=694B035D&_nc_sid=8b3546"
];

const dir = 'public/instagram';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

urls.forEach((url, index) => {
    https.get(url, (res) => {
        const fileStream = fs.createWriteStream(path.join(dir, `post${index + 1}.jpg`));
        res.pipe(fileStream);
        fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded post${index + 1}.jpg`);
        });
    }).on('error', (e) => {
        console.error(`Error downloading post${index + 1}.jpg: ${e.message}`);
    });
});
