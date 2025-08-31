export interface Message {
  _id: string;
  text: string;
  username: string;
  is_pinned: boolean;
  created_at: string;
}

export interface UserSession {
  id: string;
  session_id: string;
  username: string;
  last_active: string;
  created_at: string;
}
