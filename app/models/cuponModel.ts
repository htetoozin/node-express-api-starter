import { Model } from "sutando";

class Cupon extends Model {
  // Define the table name
  static table = "cupons";

  // Define fillable fields
  static fillable = ["code", "discount", "expiry_date", "is_active"];

  // Optional: Define date fields to automatically cast to Date objects
  static dates = ["expiry_date", "created_at", "updated_at"];
}

export default Cupon;
