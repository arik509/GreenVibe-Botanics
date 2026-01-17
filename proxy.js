import { withAuth } from "next-auth/middleware"

export function proxy(request) {
  return withAuth(request, {
    callbacks: {
      authorized({ token }) {
        // Return true if user has a valid token
        return !!token
      },
    },
  })
}

export const config = {
  matcher: ['/add-item/:path*']
}
