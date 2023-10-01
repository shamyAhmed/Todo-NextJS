import type { AuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import { auth } from '@/lib/firebase.config.admin';
import { get_or_create_user } from "@/utils/user";
import { cache } from "react";


export const authOptions: AuthOptions = {
    pages: {
        signIn: "/auth/signin",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                id_token: {

                }
            },
            async authorize(credentials, req){
                const id_token = credentials?.id_token;
                if(id_token){
                    try{
                        const {user_id: uid, name, email} = await auth.verifyIdToken(id_token);
                        if(!uid || !name || !email){
                            return null
                        }
                        const db_user = await get_or_create_user({uid, name, email})
                        if(db_user){
                            const user: User = {email: db_user.email, id: db_user.uid, name: db_user.name}
                            return user
                        }
                        return null;
                    }catch{
                        return null
                    }
                }
                return null
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 2 ** 10      
    },
    jwt: {
        maxAge: 60 * 60 * 4
    },
    callbacks: {
        async jwt({token, user, profile}){
            if(user){
                token.id = user.id
            }
            return token;
        },
        async session({session, token, user}){    
            return {...session, user: {...session.user, id: token.id}}
        }
    }
}

const handler = NextAuth(authOptions)

export { 
    handler as GET,
    handler as POST
}