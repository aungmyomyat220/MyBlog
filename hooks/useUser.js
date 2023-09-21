import {useMutation} from "@tanstack/react-query";

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