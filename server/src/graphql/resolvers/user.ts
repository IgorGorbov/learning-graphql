import crypto from "crypto";
import { Request, Response } from "express";
import { IResolvers } from "apollo-server-express";

import { Database, LoginArgs, Viewer } from "../../types";
import { Google } from "../../utils/google";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV !== "development"
};

const MAX_AGE = 30 * 24 * 60 * 60; // 30d

async function loginViaGoogle(code: string, token: string, db: Database, req: Request, res: Response) {
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

      let viewer = updateRes.value;

      if (!viewer) {
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

        viewer = insertRes.ops[0];
      }

      res.cookie("viewer", userId, { ...COOKIE_OPTIONS, maxAge: MAX_AGE });

      return viewer;
    }
  }

  throw new Error("Google login error");
}

async function loginViaCookie(token: string, db: Database, req: Request, res: Response) {
  const updateRes = await db.users.findOneAndUpdate(
    { _id: req.signedCookies.viewer },
    { $set: { token: token } },
    { returnOriginal: false }
  );

  const viewer = updateRes.value;

  if (!viewer) {
    res.clearCookie("viewer", COOKIE_OPTIONS);
  }

  return viewer;
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
    login: async (_root: undefined, { input }: LoginArgs, { db, req, res }) => {
      try {
        const token = crypto.randomBytes(16).toString("hex");

        const viewer = input?.code
          ? await loginViaGoogle(input?.code, token, db, req, res)
          : await loginViaCookie(token, db, req, res);

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
    logout: (_root: undefined, _args: {}, { res }: { res: Response }) => {
      try {
        res.clearCookie("viewer", COOKIE_OPTIONS);
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
