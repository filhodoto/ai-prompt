// Types for user in app (to not be confused with user returned from Google auth)
export interface UserProps {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface PostProps {
  creator: UserProps;
  prompt: string;
  tag: string;
  _id: string;
}
