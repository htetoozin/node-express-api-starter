import { ZodSchema } from "zod";

const validator = async (rule: ZodSchema, payload: Object) => {
  const { success, data, error } = await rule.safeParseAsync(payload);

  if (!success) {
    const errors = error.errors.map((err) => ({
      [err.path[0]]: err.message,
    }));
    return { success, errors };
  }

  return { success, data };
};

export default validator;
