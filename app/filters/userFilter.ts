import Filter from "./filter";

class UserFilter extends Filter {
  /**
   * Filter values
   */
  protected filterValues = ["name", "email"];

  /**
   * Filter by name
   */
  name(value: string) {
    return this.builder.where("name", "like", `%${value}%`);
  }

  /**
   * Filter by email
   */
  email(value: string) {
    return this.builder.where("email", value);
  }
}

export default UserFilter;
