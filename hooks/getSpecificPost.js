import { useQuery } from "@tanstack/react-query";
import { getSpecificPost } from '@/app/api'

export const getSpecificPostHook = (postId) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["getSpecificPost", postId],
    queryFn: () => getSpecificPost(postId),
  });
};
