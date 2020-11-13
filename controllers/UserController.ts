import { ObjectId } from "https://deno.land/x/mongo@v0.13.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts"
import { users } from "../config/databases.ts";
import validation from "../validation.ts";

export default {
  async index(ctx: any) {
    const data = await users.find();
    ctx.response.body = data;
  },

  async show(ctx: any) {
    try {
      const data = await users.findOne({ _id: ObjectId(ctx.params.id) });
      ctx.response.body = data;
    } catch (error) {
      ctx.response.status = 403;
      ctx.response.body = "User doesn't exist";
    }
  },

  async store(ctx: any) {
    const value = await validation.validateInsert(ctx);

    if (value) {
  
      const pwd = await bcrypt.hash(value.password)
      const insertId = await users.insertOne({
        username: value.username,
        password: pwd,
        email: value.email,
        createdAt: new Date(),
      });
      ctx.response.status = 201;
      ctx.response.body = insertId;
    }
  },

  async update(ctx: any) {
    const value = await validation.validateUpdate(ctx);

    if (value) {
      try {
        const data = {
          username: value.username,
          password: await bcrypt.hash(value.password),
          email: value.email,
        };
        const { matchedCount, modifiedCount, upsertedId } = await users
          .updateOne(
            { _id: ObjectId(ctx.params.id) },
            { $set: data },
          );
        ctx.response.status = 200;
        ctx.response.body = { message: "updated" };
      } catch (error) {
        ctx.response.status = 403;
        ctx.response.body = "User doesn't exist";
      }
    }
  },

  async destroy(ctx: any) {
    try {
      const data = await users.deleteOne({ _id: ObjectId(ctx.params.id) });
      ctx.response.body = data;
    } catch (error) {
      ctx.response.status = 403;
      ctx.response.body = "User doesn't exist";
    }
  },
};
