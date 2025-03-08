import { Model } from "sutando";

export interface UserType {
  id?: number;
  name: string;
  email: string;
  role_id: number;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare role_id: number;
  declare created_at: Date;
  declare updated_at: Date;

  static table = "users";

  static fillable = ["name", "email", "role_id"];

  static dates = ["created_at", "updated_at"];
}

export default User;
