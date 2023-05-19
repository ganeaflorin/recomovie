const regexPatterns = {
    email: ".+@.+\\..+",
    password: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?~!@$%^&*-.]).{8,}$"
}

export default regexPatterns;