import {useMutation} from "@tanstack/react-query";
import {createUser} from "../api/createUser";

const useUserMutation = () => {
    return useMutation({
        mutationKey : ['post','users'],
        mutationFn : createUser
    })
}

export const useUser = (user) => {
    return {
        useUserMutation,
    }
}