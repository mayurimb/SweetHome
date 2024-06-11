import apiRequest from "./apiRequest";
import { defer } from 'react-router-dom'

export const singlePageLoader = async ({request, params}) => {
    const res = await apiRequest("/posts/" + params.id)
    return res.data
}

export const listPageLoader = async ({request, params}) => {
    const query = request.url.split("?")[1]
    const postPromise = apiRequest("/posts? " + query)
    return defer({
        postResponse: postPromise
    })
}

export const profilePageLoader = async () => {
    const postPromise = apiRequest("/users/profilePosts")
    const chatPromise = apiRequest("/chats")
    return defer ({
        postResponse: postPromise,
        chatResponse: chatPromise  
    })
}

export const combinedChatLoader = async ({ params }) => {
    // Fetch the specific post data using the post ID from the URL parameters
    const postResponse = apiRequest("/posts/" + params.id);
    
    // Concurrently fetch profile posts and chat data related to the logged-in user
    const profilePostsResponse = apiRequest("/users/profilePosts");
    const chatsResponse = apiRequest("/chats");
  
    // Resolve all promises concurrently
    const [postResult, profilePostsResult, chatsResult] = await Promise.all([
      postResponse,
      profilePostsResponse,
      chatsResponse
    ]);
  
    // Combine and return the data
    return {
      singlePageData: await postResult.data, // Assuming the response structure includes a .data property
      profilePageData: {
        posts: await profilePostsResult.data,
        chats: await chatsResult.data
      }
    };
  } 