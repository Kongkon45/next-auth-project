import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import connectDB from "@/components/lib/connectDB";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  secret : process.env.NEXT_PUBLIC_SECRET_KEY,
  session: {
    strategy: "jwt",
    maxAge : 30 * 24 * 60 * 60
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your Email...",
          requered: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your Password...",
          requered: true,
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!credentials) {
          return null;
        }
        if (email) {
          // const currentUser = users?.find((user)=> user?.email === email)
          const db = await connectDB();
          const currentUser = await db.collection('users-info').findOne({email});
          console.log(currentUser);
          if (currentUser) {
            if (currentUser?.password === password) {
              return currentUser;
            }
          }
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.type = user.type;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.type = token.type;
      return session;
    },
  },
});

// const users = [
//     {
//         id : 1,
//         name : "Kongkon Jowarder",
//         email : "kongkon@gmail.com",
//         password : "password",
//         type : "admin",
//         image : "https://i.ibb.co/DgxQRZD/Kongkon.jpg"
//     },
//     {
//         id : 2,
//         name : "Rakib",
//         email : "rakib@gmail.com",
//         password : "password",
//         type : "moderator",
//         image : "https://i.ibb.co/DgxQRZD/Kongkon.jpg"
//     },
//     {
//         id : 3,
//         name : "Mehedi Hasan",
//         email : "mehedi@gmail.com",
//         password : "password",
//         type : "User",
//         image : "https://i.ibb.co/DgxQRZD/Kongkon.jpg"
//     },
// ]

export { handler as GET, handler as POST };
