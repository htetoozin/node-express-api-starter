import { ZodSchema } from "zod";

const validator = async (rule: ZodSchema, payload: Object) => {
  const result = await rule.safeParse(payload);

  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      [err.path[0]]: err.message,
    }));

    return {
      success: result.success,
      errors,
    };
  }

  return {
    success: result.success,
    data: result.data,
  };
};

export default validator;
