import { FieldValue } from "firebase/firestore";

export type Member = {
  display_name: string | null | undefined;
  local_id: string | null | undefined;
  photo_url: string | null | undefined;
};

export interface RoomModel {
  id?: string | null;
  room_name: string | null;
  room_member: Member[];
  code: string | null;
  latest_changes_length?: number;
  latest_cursor_position?: number;
  created_at?: FieldValue;
}
