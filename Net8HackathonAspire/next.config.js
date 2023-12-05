/** @type {import('next').NextConfig} */
module.exports = {
    // Other configurations...
    server: {
        https: {
            key: 'C:/Users/Tucker/AppData/Local/mkcert/hackathon+1-key.pem',
            cert: 'C:/Users/Tucker/AppData/Local/mkcert/hackathon+1.pem',
        },
    },
};
