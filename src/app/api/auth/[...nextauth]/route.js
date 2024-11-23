// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
