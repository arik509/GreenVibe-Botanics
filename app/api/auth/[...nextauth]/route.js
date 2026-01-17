import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    
    // Credentials Provider (Email/Password)
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@greenvibe.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // For demo: hardcoded credentials
        // In production: verify against your database
        if (credentials?.email === 'admin@greenvibe.com' && credentials?.password === 'green123') {
          return {
            id: '1',
            name: 'Admin User',
            email: 'admin@greenvibe.com',
            image: null,
            role: 'admin'
          }
        }
        
        // You can also verify against a database:
        // const user = await User.findOne({ email: credentials.email })
        // const isValid = await bcrypt.compare(credentials.password, user.passwordHash)
        // if (isValid) return user
        
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  
  // Custom pages
  pages: {
    signIn: '/login',
    error: '/login', // Error code passed in query string as ?error=
  },
  
  // Callbacks
  callbacks: {
    async jwt({ token, user, account }) {
      // Add custom fields to token
      if (user) {
        token.id = user.id
        token.role = user.role || 'user'
      }
      if (account?.provider === 'google') {
        token.provider = 'google'
      }
      return token
    },
    
    async session({ session, token }) {
      // Add custom fields to session
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.provider = token.provider
      }
      return session
    },
    
    async redirect({ url, baseUrl }) {
      // Redirect to items page after successful login
      if (url === baseUrl + '/login') {
        return baseUrl + '/items'
      }
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  
  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  
  // Enable debug messages in development
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
