// I dont think this needed

import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
import AzureADProvider from "next-auth/providers/azure-ad";


export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // secret: AZURE_AD_CLIENT_SECRET,
  const providers = [
    // CredentialsProvider(...),
        AzureADProvider({
          clientId: process.env.AZURE_AD_CLIENT_ID!,
          clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
          tenantId: process.env.AZURE_AD_TENANT_ID,
  

        }),
      
  ]

  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.includes("signin")

  // Will hide the `GoogleProvider` when you visit `/api/auth/signin`
  if (isDefaultSigninPage) providers.pop()

  return await NextAuth(req, res, {
    providers,
  })
}