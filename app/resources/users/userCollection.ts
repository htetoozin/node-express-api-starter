import { metaPagination } from "../pagination";
import { userResource } from "./userResource";

export const userCollection = (data: any) => {
  return {
    data: data.map((item: any) => ({
      ...userResource(item),
    })),
    pagination: metaPagination(data),
  };
};
