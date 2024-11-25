// USER TYPES

export interface RegisterUserProps {
  username: string;
  full_name: string;
  email: string;
  password: string;
  re_password: string;
}

export interface RegisterUserResponseProps {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LoginUserProps {
  email: string;
  password: string;
}

export interface LoginUserResponseProps {
  refresh: string;
  access: string;
}

export interface LoginUserWithMFAProps {
  message: string;
  otp: boolean;
}

export type LoginResponse = LoginUserResponseProps | LoginUserWithMFAProps;

export interface ActivateUserProps {
  uid?: string;
  token?: string;
}

export interface ResetPasswordProps {
  email: string;
}

export interface ResetPasswordConfirmProps {
  uid?: string;
  token?: string;
  new_password?: string;
  re_new_password?: string;
}

interface SuggestedPeopleProps {
  id: string;
  full_name: string;
  username: string;
  get_avatar: string;
}

export interface UserProps {
  id: string;
  full_name: string;
  username: string;
  email: string;
  get_avatar?: string;
  posts_count?: string;
  followers_count: string;
  following_count: string;
  user_follows: boolean;
  notifications_count: number;
  suggested_people: SuggestedPeopleProps[];
  received_messages_count: number;
  mfa_enabled: boolean;
}

export interface PostProps {
  attachments?: AttachmentProps[];
  id: string;
  body: string;
  created_by: UserProps;
  created_at_formatted: string;
  likes_count: string;
  user_liked: boolean;
  post_saved: boolean;
  post_owner: boolean;
  comments?: CommentProps[];
  subtitle?: string;
  comments_count: string;
  shared: PostProps;
}

export interface RetrievePostsResponse {
  results: PostProps[];
  next: string | null;
}

export interface CommentProps {
  id: string;
  body: string;
  created_by: UserProps;
  created_at_formatted: string;
  comment_owner: boolean;
}

export interface AttachmentProps {
  id: string;
  get_image: string;
}

// CHAT TYPES

export interface LastReceivedMessageProps {
  last_message?: string;
  seen: boolean;
}

export interface ConversationProps {
  id: string;
  modified_at_formatted: string;
  user: UserProps;
  last_received_message: LastReceivedMessageProps;
  messages: MessageProps[];
}

export interface MessageProps {
  id: string;
  sent_to: UserProps;
  created_by: UserProps;
  created_at_formatted: string;
  body: string;
}

export interface ConversationDetailsProps {
  id: string;
  users: UserProps[];
  modified_at_formatted: string;
  messages: MessageProps[];
}

// NOTIFICATION TYPES

export interface NotificationProps {
  id: string;
  body: string;
  post_id: string;
  created_for: string;
  notification_type: string;
  is_read: boolean;
}
