import User from "../../models/userModel";
import { imagePath } from "../../utils";

export const userResource = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role_id: user.role_id,
    path: user.path ? imagePath(user.path) : null,
  };
};
