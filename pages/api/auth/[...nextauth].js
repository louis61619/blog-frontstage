import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import jwt from 'jsonwebtoken'

import { login, getUserInfo } from "~/services/user";

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
    // ...add more providers here
  ],
  callbacks: {
    // async redirect(url, baseUrl) {
    //   return baseUrl
    // },
    async signIn(user, account, profile) {
      // console.log("singinuser:", user);
      const { name, email, image } = user;
      if (!email) return false
      const token = jwt.sign(user, process.env.AUTH_TOKEN, {
        expiresIn: 60,
      })
      const result = await login(name, email, image, token);
      if (result.data === 'is not login') return false
      user.id = result.id
      user.accessToken = result.token
      return true;
    },
    async jwt(token, user, account, profile, isNewUser) {
      // console.log("jwtuser", user)
      if (user) {
        const { id, name, email, image, accessToken } = user;
        token = { 
          id, name, email, image, accessToken
        }
      }
      return token;
    },
    async session(session, token) {
      // console.log("sessionuser",session, token)
      // const { id, name, email, image, accessToken } = token;
      // session.user = {
      //   id, name, email, image, accessToken
      // }

      const { id, name, email, image, accessToken } = token;
      const userInfo = await getUserInfo(id, accessToken)
      userInfo.accessToken = accessToken
      session.user = userInfo
      // console.log(userInfo)
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
