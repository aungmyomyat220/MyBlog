import {useQuery} from "@tanstack/react-query";
import {getPost} from "@/app/api";

export const getAllPostHook = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
        queryKey: ["getAllPost"],
        queryFn: getPost,
    })
}