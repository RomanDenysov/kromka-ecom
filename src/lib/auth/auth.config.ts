import type { User as TUser } from '@payload-types'
import type { DefaultSession, NextAuthConfig, Profile } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import Google from 'next-auth/providers/google'
import Nodemailer from 'next-auth/providers/nodemailer'
import { getPayloadUser } from 'payload-authjs'
import { env } from '~/env'

declare module 'next-auth/jwt' {
  interface JWT extends Pick<Profile, 'role'> {
    id?: string
  }
}

declare module 'next-auth' {
  interface Profile {
    role: TUser['role']
  }

  interface User extends Pick<JWT, 'id' | 'role'> {}
  interface Session extends DefaultSession {
    user: User & DefaultSession['user']
  }
}

export default {
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          role: profile.role,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
    Nodemailer({
      server: env.EMAIL_SERVER,
      from: env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, profile }) => {
      if (user) {
        token.id = user.id
      }
      if (profile && 'role' in profile) {
        token.role = profile.role
      }
      return token
    },
    session: async ({ session, user, token }) => {
      if (token) {
        if (token.id) {
          session.user.id = token.id
        }
        session.user.role = token.role
      }
      if (user) {
        session.user.id = user.id
      }

      return session
    },
  },
} satisfies NextAuthConfig
