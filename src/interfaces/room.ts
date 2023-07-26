export type Member = {
  display_name: string | null;
  local_id: string | null;
  photo_url: string | undefined;
};

export interface RoomModel {
  id: string | null;
  room_name: string | null;
  room_member: Member[];
  code: string | null;
}
