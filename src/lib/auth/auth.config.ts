import type { User as PayloadUser } from '@payload-types'
import type { DefaultSession, NextAuthConfig, Profile } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { Provider } from 'next-auth/providers'
import Google from 'next-auth/providers/google'
import Nodemailer from 'next-auth/providers/nodemailer'
import { PayloadAuthjsUser } from 'payload-authjs'
import { env } from '~/env'
import { useAuth } from '~/hooks/use-auth'

declare module 'next-auth/jwt' {
  interface JWT extends Pick<Profile, 'role'> {
    id?: string
  }
}

declare module 'next-auth' {
  interface Profile {
    role: PayloadUser['role']
  }
  interface User extends Pick<JWT, 'id' | 'role'> {}
  interface Session extends PayloadAuthjsUser<PayloadUser> {}
}

const providers: Provider[] = [
  Google({
    clientId: env.AUTH_GOOGLE_ID,
    clientSecret: env.AUTH_GOOGLE_SECRET,
    allowDangerousEmailAccountLinking: true,
    authorization: {
      params: {
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code',
      },
    },
    profile(profile) {
      return {
        id: profile.sub,
        role: profile.role || 'user',
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
]

export default {
  providers,
  session: {
    strategy: 'jwt',
    maxAge: 5 * 24 * 60 * 60, // 5 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  trustHost: true,
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    jwt: async ({ token, user, profile }) => {
      if (user) {
        token.id = user.id
        token.role = user.role || profile?.role || 'user'
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as PayloadUser['role']
        // Убедимся, что email всегда присутствует
        if (token.email) {
          session.user.email = token.email
        }
      }
      return session
    },
    authorized: ({ auth, request: { nextUrl } }) => {
      // Добавляем проверку для админ-роутов
      if (nextUrl.pathname.startsWith('/admin')) {
        return auth?.user?.role === 'admin'
      }
      return !!auth
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log('Signing in', { user, account, profile })
    },
  },
} satisfies NextAuthConfig

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== 'credentials')
