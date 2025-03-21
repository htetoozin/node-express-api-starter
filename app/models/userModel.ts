import { Attribute, Model } from "sutando";
import bcrypt from "bcrypt";

export interface UserType {
  id?: number;
  name: string;
  email: string;
  role_id: number;
  path: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare role_id: number;
  declare path: string;
  declare created_at: Date;
  declare updated_at: Date;

  static table = "users";

  static fillable = ["name", "email", "role_id", "path", "password"];

  static dates = ["created_at", "updated_at"];

  hidden = ["password", "created_at", "updated_at"];

  /**
   * Store bcrypt hashing value password when user saving.
   */
  attributePassword() {
    return Attribute.make({
      set: (value: string) => bcrypt.hashSync(value, 10),
    });
  }

  /**
   * Query Scopes
   */
  scopeFilter(query: any, filter: any) {
    return filter.apply(query);
  }
}

export default User;
