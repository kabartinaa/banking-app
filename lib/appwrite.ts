// src/lib/appwrite.ts
"use server";
import { Client, Account,Users,Databases } from "node-appwrite";
import { cookies } from "next/headers";


      // Your login code stores the session secret in the appwrite-session cookie. 
      // Later, createSessionClient() reads that cookie and uses it to make requests as that user.
      export async function createSessionClient() {
        const client = new Client()
          .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
          .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
      
        const cookieStore = await cookies();
        const session = cookieStore.get("appwrite-session");
      
        console.log("Session cookie exists:", !!session?.value);
      
        if (!session?.value) {
          throw new Error("No session cookie found");
        }
      
        client.setSession(session.value);
      
        return {
          get account() {
            return new Account(client);
          },
        };
      }


// The admin client is for server-side operations that need API-key permissions,
// rather than a particular user's session.
//   bec to :Create or manage Appwrite Auth users
//   Perform administrative account operations.
//   Run backend tasks that need permissions beyond those of the logged-in user.
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

    console.log(
      "Appwrite key loaded:",
      !!process.env.NEXT_APPWRITE_KEY
    );

  return {

    //Work with the current user's account
    get account() {
      return new Account(client);
    },

    //Work with database records
    get database() {
      return new Databases(client);
    },

    //Administratively manage user accounts
    get user() {
      return new Users(client);
    },
  };
}