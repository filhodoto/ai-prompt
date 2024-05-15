// Types for user in app (to not be confused with user returned from Google auth)

// Type for user collection saved in DB. Not to be confused with user types from authentication "ClientSafeProvider"
interface UserProps {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export interface PostProps {
  creator: UserProps;
  prompt: string;
  tag: string;
  _id: string;
}

// Type for create/edit pages, where we will only need the text info of the posts
export type PostInfoProps = Pick<PostProps, 'prompt' | 'tag'>;
