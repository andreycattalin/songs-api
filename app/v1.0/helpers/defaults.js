const regexPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/

module.exports = {
    regexPassword,
    regexEmail,
}