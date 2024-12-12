import type { User as TUser } from '@payload-types'
import type { DefaultSession, NextAuthConfig, Profile } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { Provider } from 'next-auth/providers'
import Google from 'next-auth/providers/google'
import Nodemailer from 'next-auth/providers/nodemailer'
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

const providers: Provider[] = [
  Google({
    clientId: env.AUTH_GOOGLE_ID,
    clientSecret: env.AUTH_GOOGLE_SECRET,
    allowDangerousEmailAccountLinking: true,
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
  trustHost: true,
  useSecureCookies: env.NODE_ENV === 'production',
  // cookies:
  //   env.NODE_ENV === 'production'
  //     ? {
  //         sessionToken: {
  //           name: `__Secure-next-auth.session-token`,
  //           options: {
  //             httpOnly: true,
  //             sameSite: 'lax',
  //             path: '/',
  //             secure: true,
  //           },
  //         },
  //         callbackUrl: {
  //           name: `__Secure-next-auth.callback-url`,
  //           options: {
  //             sameSite: 'lax',
  //             path: '/',
  //             secure: true,
  //           },
  //         },
  //         csrfToken: {
  //           name: `__Host-next-auth.csrf-token`,
  //           options: {
  //             httpOnly: true,
  //             sameSite: 'lax',
  //             path: '/',
  //             secure: true,
  //           },
  //         },
  //       }
  //     : undefined,
  session: {
    strategy: 'jwt',
    maxAge: 5 * 24 * 60 * 60, // 5 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
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
        // Убедимся, что роль всегда присутствует
        token.role = user.role || profile?.role || 'user'
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as TUser['role']
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
