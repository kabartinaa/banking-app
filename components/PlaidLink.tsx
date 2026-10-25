// import React ,{useCallback ,useState,useEffect}from 'react'
// import {Button} from './ui/button'
// import {PlaidLinkOnSuccess ,PlaidLinkOptions,usePlaidLink} from 'react-plaid-link'
// import {useRouter} from 'next/navigation'

// import {createLinkToken,exchangePublicToken} from '@/lib/actions/user.actions'


// const PlaidLink = ({user,variant}:PlaidLinkProps) => {

//   const router = useRouter();
//   const [token, setToken] = useState('')
//   const [linkTokenError, setLinkTokenError] = useState<string | null>(null)

//   useEffect(() => {
//     let cancelled = false
//     const getLinkToken=async () => {
//       try {
//         const data=await createLinkToken(user)
//         if (!data?.linkToken) throw new Error("Plaid did not return a link token")
//         if (!cancelled) {
//           setToken(data.linkToken)
//           setLinkTokenError(null)
//         }
//       } catch (error) {
//         console.error("Failed to create Plaid link token:", error)
//         if (!cancelled) {
//           setLinkTokenError("Unable to prepare the bank connection. Please try again.")
//         }
//       }
//     }

//     void getLinkToken()
//     return () => {
//       cancelled = true
//     }
//   }, [user])
  



//   const onSuccess = useCallback<PlaidLinkOnSuccess>(
//     async (public_token) => {
//       if (!public_token) {
//         throw new Error("Plaid public token is missing");
//       }
  
//       await exchangePublicToken({
//         publicToken: public_token,
//         user,
//       });
  
//       router.push('/');
//     },
//     [user, router]
//   );

  


//   const config: PlaidLinkOptions = {
//     token,
//     onSuccess
//   }
//   const{open,ready}=usePlaidLink(config);


//   return (
//     <>
//       {linkTokenError && (
//         <p role="alert" className="form-message">
//           {linkTokenError}
//         </p>
//       )}
//       {variant==='primary' ? (
//         <Button 
//         onClick={ ()=> open()}
//         disabled={!ready}
//         className="plaidlink-primary"
//         >
//           Connect Bank
//         </Button>
//       ): variant==='ghost'?(
//         <Button>
//           Connect Bank
//         </Button>
//       ) :
//       (<Button>
//         Connect Bank
//       </Button>)
    
//     }
//     </>
//   )
// }

// export default PlaidLink

import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  const [token, setToken] = useState('');

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken);
    }

    getLinkToken();
  }, [user]);

  
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token) => {
      if (!public_token) {
        console.error("Public token is missing");
        return;
      }
  
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
  
      router.push("/");
    },
    [user, router]
  );
  
  
  const config: PlaidLinkOptions = {
    token,
    onSuccess
  }

  const { open, ready } = usePlaidLink(config);
  
  return (
    <>
      {variant === 'primary' ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ): variant === 'ghost' ? (
        <Button onClick={() => open()} variant="ghost" className="plaidlink-ghost">
          <Image 
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className='hiddenl text-[16px] font-semibold text-black-2 xl:block'>Connect bank</p>
        </Button>
      ): (
        <Button onClick={() => open()} className="plaidlink-default">
          <Image 
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
        </Button>
      )}
    </>
  )
}

export default PlaidLink