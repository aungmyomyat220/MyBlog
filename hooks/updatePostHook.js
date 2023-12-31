import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useQueryClient} from "@tanstack/react-query";

export const updatePostHook = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation(
        async ({ Id, comments }) => {
            return await axios.patch(`http://localhost:8000/posts/${Id}`, comments);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("getAllPost")
            },
        }
    );
};