import NextAuth, { DefaultSession } from "next-auth"
import Facebook from "next-auth/providers/facebook"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Facebook],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, { access_token: account.access_token });
      }
      return token
    },
    async session({ session, token }) {
      if (session) {
        const newObject = {
          ...session,
          user: {
            ...session.user,
            access_token: token.access_token,
          },
        }
        session = newObject;
      }
      return session;
    }
  }
})