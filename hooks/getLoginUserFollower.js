import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
export const getLoginUserFollower = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: ({Id,follower}) => {
            return axios.patch(`http://localhost:8000/users/${Id}`, follower)
        },
        onSuccess : () => {
            queryClient.invalidateQueries("getAllUser")
        }
    })
};
