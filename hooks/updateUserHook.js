import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
export const updateUserHook = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: ({Id,updateData,updateCategory}) => {
            const requestData = {
                updateData,
                updateCategory
            };
            return axios.patch(`/users/${Id}`, requestData)
        },
        onSuccess : () => {
            queryClient.invalidateQueries("getAllUser","getModifiedUser")
        }
    })
};
