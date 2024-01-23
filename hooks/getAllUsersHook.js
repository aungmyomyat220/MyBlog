import {useQuery} from "@tanstack/react-query";
import {getUser} from "@/app/api";

export const getAllUsersHook = () => {
     // eslint-disable-next-line react-hooks/rules-of-hooks
     return useQuery({
         queryKey: ["getAllUser"],
         queryFn: getUser,
     })
 }