import crypto from "crypto";
import { IResolvers } from "apollo-server-express";

import { Database, LoginArgs, Viewer } from "../../lib/types";
import { Google } from "../../utils/google";

async function loginWitGoogle(code: string, token: string, db: Database) {
  const { user } = await Google.login(code);

  if (user) {
    const { names, photos, emailAddresses } = user;

    const userName = names?.[0].displayName;
    const userId = names?.[0].metadata?.source?.id;
    const userAvatar = photos?.[0].url;
    const userEmail = emailAddresses?.[0].value;

    if (userName && userId && userAvatar && userEmail) {
      const updateRes = await db.users.findOneAndUpdate(
        { _id: userId },
        { $set: { name: userName, avatar: userAvatar, token: token } },
        { returnOriginal: false }
      );

      if (!updateRes.value) {
        const insertRes = await db.users.insertOne({
          _id: userId,
          token: token,
          name: userName,
          avatar: userAvatar,
          contact: userEmail,
          income: 0,
          bookings: [],
          listings: []
        });

        return insertRes.ops[0];
      }

      return updateRes.value;
    }
  }

  throw new Error("Google login error");
}

export const userResolvers: IResolvers = {
  Query: {
    authUrl: () => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`Failed to query Google Auth Url ${error}`);
      }
    }
  },

  Mutation: {
    login: async (_root: undefined, { input }: LoginArgs, { db }) => {
      try {
        const token = crypto.randomBytes(16).toString("hex");
        const viewer = input?.code ? await loginWitGoogle(input?.code, token, db) : undefined;

        if (!viewer) {
          return { didRequest: true };
        }

        return {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          didRequest: true
        };
      } catch (error) {
        throw new Error(`Failed to login ${error}`);
      }
    },
    logout: () => {
      try {
        return { didRequest: true };
      } catch (error) {
        throw new Error(`Failed to logout ${error}`);
      }
    }
  },

  Viewer: {
    id: (viewer: Viewer) => {
      return viewer._id;
    },
    hasWallet: (viewer: Viewer) => {
      return Boolean(viewer.walledId);
    }
  }
};
