export default {
  async validateInsert(ctx: any) {
    let status;
    let errors = [];
    const value = await ctx.request.body().value;

    if (!value || Object.keys(value).length === 0) {
      ctx.response.status = 400; //bad request
      ctx.response.body = { error: "Please provide the required data" };
      return false;
    }

    const fields = ["username", "password", "email"];
    for (let index = 0; index < fields.length; index++) {
      if (!value[fields[index]]) {
        status = 422; //unprocessable data
        errors.push({ [fields[index]]: `Please provide the ${fields[index]}` });
      }
    }

    if (status) {
      ctx.response.status = status;
      ctx.response.body = { errors };
      return false;
    }
    return value;
  },
  async validateUpdate(ctx: any) {
    const value = await ctx.request.body().value;
    if (!value || Object.keys(value).length === 0) {
      ctx.response.status = 400; //bad request
      ctx.response.body = { error: "Please provide the required data" };
      return false;
    }
    return value;
  },
  async validateLogin(ctx: any) {
    const value = await ctx.request.body().value;
    if (!value || Object.keys(value).length === 0) {
      ctx.response.status = 400; //bad request
      ctx.response.body = { error: "Please provide the required data" };
      return false;
    }
    return value;
  },
};
