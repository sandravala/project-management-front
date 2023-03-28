import HTTP from "./";

const login = (loginData) => HTTP.post("/login", loginData)
    .then(({ data }) => data)

const signUp = (signupData) => HTTP.post("/user", signupData)
    .then(({data}) => data)

export { login, signUp }