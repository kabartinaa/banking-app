'use server';

import {createSessionClient ,createAdminClient} from '../appwrite'
import { ID } from "node-appwrite";
import { cookies } from "next/headers";

import {parseStringify}from '../utils'

// export const signIn=async ({email,password}:signInProps) => {
//     try {
//         const { account } = await createAdminClient();

//         const response=await account.createEmailPasswordSession(email,password);
//         return parseStringify(response);
//     } catch (error) {
//         console.log('Error',error)
      
//     }
// }

export const signIn = async ({ email, password }: signInProps) => {
    try {
      const { account } = await createAdminClient();
  
      // 1. Create an Appwrite session
      const session = await account.createEmailPasswordSession(
        email,
        password
      );
  
      // 2. Store the session secret in a cookie
      (await cookies()).set("appwrite-session", session.secret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
  
      // 3. Return the session response
      return parseStringify(session);
    } catch (error) {
      console.error("Sign-in error:", error);
      return null;
    }
  };

export const signUp=async (userData:SignUpParams) => {
  try {
      // create user account from appwrite - BAAS
            const {email,password,firstName ,lastName} =userData;
            const { account } = await createAdminClient();

            const newUserAccount = await account.create({
                userId: ID.unique(),
                email,
                password,
                name:`${firstName} ${lastName}`
            });
            const session = await account.createEmailPasswordSession({
                email,
                password
            });

            (await cookies()).set("my-custom-session", session.secret, {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: true,
            });

            return parseStringify(newUserAccount)
  } catch (error) {
      console.log('Error',error)
    
  }
}

// ... your initilization functions

export async function getLoggedInUser() {
  try {

    // 1. Reads the appwrite-session cookie.
    //     Uses the session to identify the logged-in user.
    const { account } = await createSessionClient();

    // 2. Requests the current user's account information from Appwrite.
    //     Returns details such as the user's ID, name, and email.
    const user =  await account.get();
    return parseStringify(user)
  } catch (error) {
    console.error("getLoggedInUser error:", error);
    return null;
}
}

export const   logoutAccount = async () => {
    try {
        const{account}=await createSessionClient()

        // End the current Appwrite session
        await account.deleteSession("current");

        // Remove the session cookie
    (await cookies()).delete("appwrite-session");
    return { success: true };
        
    } catch (error) {
        console.error("Logout failed:", error);
    return { success: false };
    }
    
}