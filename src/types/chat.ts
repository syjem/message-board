export interface Message {
  _id: string;
  text: string;
  username: string;
  created_at: string;
}

export interface UserSession {
  id: string;
  session_id: string;
  username: string;
  last_active: string;
  created_at: string;
  expires_at: string;
  is_admin: boolean;
}
