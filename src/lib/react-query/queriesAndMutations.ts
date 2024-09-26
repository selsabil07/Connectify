import { 
  useInfiniteQuery,
    // useQuery,
    useMutation,
    useQuery,
    useQueryClient,
    
 } from "@tanstack/react-query" 
import { createPost, createUserAccount, deletePost, deleteSavedPost, getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, getUserById, getUsers, likePost, savePost, searchPosts, signInAccount, signOutAccount, updatePost } from "../appwrite/api";
import { INewPost, INewUser, IUpdatePost } from "@/types";
import { QUERY_KEYS } from "./querykeys";

 export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn:(user: INewUser) => createUserAccount(user),
    })
 }

 export const useSignInAccount = () => {
    return useMutation({
        mutationFn:(user: {
            email:string 
            password:string

        }) => signInAccount(user),
    })
 }

 export const useSignOutAccount = () => {
    return useMutation({
        mutationFn : signOutAccount,
    })
 }

 export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  }
  
  export const useGetRecentPosts = () => { 
    return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      queryFn: getRecentPosts,
    });
  }


  export const useLikePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        postId,
        likesArray,
      }: {
        postId: string;
        likesArray: string[];
      }) => likePost(postId, likesArray),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
        })
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        })
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS],
        })
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        })
      },
    })
  }


  export const useSavePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
        savePost(userId, postId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        })
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS],
        })
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        })
      },
    })
  }
  
  export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        })
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS],
        }) 
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        })
      },
    })
  }  

  export const useGetCurrentUser = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      queryFn: getCurrentUser,
    })
  }

  export const useGetPostById = (postId?: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
      queryFn: () => getPostById(postId),
      enabled: !!postId,
    });
  }

  export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: IUpdatePost) => updatePost(post),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
        });
      },
    });
  };
  
  export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ postId, imageId }: { postId?: string; imageId: string }) =>
        deletePost(postId, imageId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };


  // interface Document {
  //   $id: string;
  //   // Add other properties as needed
  // }

  // interface DocumentList<T> {
  //   documents: T[];
  //   total: number; // Example of another property in your response
  // }

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage: any)=> {

      if (!lastPage || lastPage.documents.length === 0) {
                return undefined;
              }
              const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
                    return lastId;
        
    }
  })
}

// export const useGetPosts = () => {
//   return useInfiniteQuery<DocumentList<Document>, Error>({
//     queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
//     queryFn: getInfinitePosts,
//     getNextPageParam: (lastPage) => {
//       // If there's no data or the last page has no documents, stop pagination
//       if (!lastPage || lastPage.documents.length === 0) {
//         return undefined;
//       }

//       // Return the ID of the last document as the cursor for the next page
//       const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
//       return lastId;
//     },
//   });
// };


// export const useGetPosts = () => {
//   return useInfiniteQuery<DocumentList<Document>, Error>(
//     [QUERY_KEYS.GET_INFINITE_POSTS], // Query key
//     getInfinitePosts,                // Query function
//     {
//       getNextPageParam: (lastPage: any) => {
//                // Return the ID of the last document as the cursor for the next page
//         const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
//         return lastId;
//       },
//     }
//   );
// };


  export const useSearchPosts = (searchTerm: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
      queryFn: () => searchPosts(searchTerm),
      enabled: !!searchTerm,
    })
  }
    
  export const useGetUserById = (userId: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
      queryFn: () => getUserById(userId),
      enabled: !!userId,
    });
  }
  export const useGetUsers = (limit?: number) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_USERS],
      queryFn: () => getUsers(limit),
    });
  };