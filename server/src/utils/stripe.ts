import Stripe from "stripe";

const client = new Stripe(`${process.env.S_SECRET_KEY}`, {} as any);

export const stripe = {
  connect: async (code: string) => {
    return await client.oauth.token({
      grant_type: "authorization_code",
      code: code
    });
  }
};
