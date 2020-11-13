import { ObjectId } from "https://deno.land/x/mongo@v0.13.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import {users} from "../config/databases.ts";
import validation from "../validation.ts";

export default {
  async login(ctx: any) {
    const value = await validation.validateLogin(ctx);
    let passwordMatched = false;
    if (value) {
      const data = await users.findOne({email: value.email });
      if (data) {
        passwordMatched = await bcrypt.compare( value.password, data.password);
      }
      ctx.response.body = passwordMatched;
    }
    
  }
}