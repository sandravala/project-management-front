import HTTP from "./";
import {useMutation, useQuery, useQueryClient} from "react-query";

const login = (loginData) => HTTP.post("/login", loginData)
    .then(({ data }) => data)

const signUp = (signupData) => HTTP.post("/user", signupData)
    .then(({data}) => data)

const setRoles = (id, listOfRoles) => HTTP.put(`/roles/${id}`, listOfRoles)
    .then(({data}) => data)

const UseGetAllUsers = () => {
    const getUsers = () =>
    HTTP.get("/users")
        .then(response => response.data)
        .catch((error) => console.log(error.message));

    const context = useQuery('getUsers', getUsers, { refetchOnWindowFocus: false})
    return {...context, users: context.data}
}


export { login, signUp, setRoles, UseGetAllUsers }