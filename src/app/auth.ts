import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import Credentials from "next-auth/providers/credentials"

import  prisma from '@/lib/db'; 
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";


const { AZURE_AD_CLIENT_ID, AZURE_AD_CLIENT_SECRET, AZURE_AD_TENANT_ID } =
  process.env;
if (!AZURE_AD_CLIENT_ID || !AZURE_AD_CLIENT_SECRET || !AZURE_AD_TENANT_ID) {
  throw new Error("The Azure AD environment variables are not set.");
}
const handler = NextAuth({
//  const {handlers, auth, signIn, signOut} = NextAuth({
  secret: AZURE_AD_CLIENT_SECRET,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      // authorize: async () => {//credentials) => {
      authorize: async (credentials) => {
        if(!credentials){
          throw new Error();
        }
        const user = null

        // const newUser = await prisma.users.create({data:{
        //   Student_Email:credentials?.email,
        //   Password:credentials?.password,
        //   Signin_Method:'Email/Password',
        //   Student_Name:'undefined'
        // }});
        // console.log(newUser)
        console.log('signin page');
        try{
        const dbUser = await prisma.users.findUnique({ where: { Student_Email: credentials.email.toLowerCase() } });
        console.log(dbUser);
        if (!dbUser) {
          throw new Error;
        }
        }catch{
          throw new Error;
        }
        console.log("success");
        
      
        // // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)
 
        // // logic to verify if the user exists
        // user = await getUserFromDb(credentials.email, pwHash)
 
        // if (!user) {
        //   // No user found, so this is their first attempt to login
        //   // meaning this is also the place you could do registration
        //   throw new Error("User not found.")
        // }
 
        // return user object with their profile data
        return user;
      },
    }),
    AzureADProvider({
      clientId: AZURE_AD_CLIENT_ID,
      clientSecret: AZURE_AD_CLIENT_SECRET,
      tenantId: AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, {
          access_token: account.access_token,
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
        });
        console.log(session);
      }
      return session;
    },


    
  },
});
export { handler as GET, handler as POST };
// export { handlers,signIn, signOut,auth };