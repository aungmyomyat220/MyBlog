import {useMutation} from "@tanstack/react-query";
import axios from "axios";
export const getLoginUserFollower = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
        mutationFn: ({Id,follower}) => {
            const result =  axios.patch(`http://localhost:8000/users/${Id}`, follower)
            return result.then(r=>{
                r.data.user
            })
        },
    })
};
