"use client";
import React ,{useState}from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { zodResolver } from "@hookform/resolvers/zod"
import{useForm} from "react-hook-form"
import CustomeInput from "@/components/CustomeInput";
import {authFormSchema} from '@/lib/utils'
import { Loader2 } from "lucide-react";
import {signUp} from "@/lib/actions/user.actions"
import {signIn} from "@/lib/actions/user.actions"



import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// zod is a form validation tool , allowing us to choose schema of form we need
import {z} from "zod"
// const formSchema = z.object({
//   username: z.string().min(1, "Username is required"),
//   email: z.string().min(1, "Email is required").email("Invalid email"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   });

import {useRouter} from 'next/navigation'


const AuthFom = ({type}:{type:string}) => {
  const [user, setUser] = useState(null)
  const [IsLoading, setIsLoading] = useState(false)

  const formSchema =authFormSchema(type);
  const router=useRouter();


  //1. define form

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    })

  //2.submit form
  const  onSubmit=async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {

      //sign up with appwrite & create paid token

      if(type==='sign-up')
      {
        const  newUser = await signUp(data)

       setUser(newUser)
      }

      // if(type==='sign-in')
      {
        const response =await signIn({
          email:data.email,
          password:data.password
        })

        if(response) router.push('/')   
          // move to home page

      }

      
      
    } catch (error) {
      
    }
    finally{setIsLoading(false)}
  }



  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
          {/* <Link href="/"
             className=" cursor-pointer items-center gap-1 ">
             <Image src="/icons/logo.svg" 
             width={34} height={34} alt="Horizon logo" 
             
             />    
             <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                 Horizon
             </h1>   
            </Link> */}

            <Link
              href="/"
              className="flex items-center gap-2 cursor-pointer w-fit"
            >
              <Image
                src="/icons/logo.svg"
                width={40}
                height={40}
                alt="Horizon logo"
              />

              <h1 className="text-3xl font-ibm-plex-serif font-bold text-black-1">
                Horizon
              </h1>
            </Link>

            <div className="flex  flex-col gap-1 md:gap-3 ">
              <h1 className="text-[24px] lg:text-[36px] 
              font-semibold text-gray-900">
                {user
                ? 'Link Account'
                : type==='sign-in'
                ? 'Sign-In'
                :'Sign-Up'
                }

                <p className="text-16 font-semibold text-gray-600">
                  {user? 'Link your account to get started' 
                  :'Please enter your details'}

                </p>
              </h1>
            </div>
        
      </header>

      {user?
      (
        <div className="flex flex-col gap-4">
          {/* account link url */}

        </div>
      )  :
      (
        <>
         <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >



                {/* <CustomeInput
                  control={form.control}
                  name="username"
                  label="Username"
                  placeholder="Enter your username"
                /> */}


                {/* // same AuthForm but different type 
                   1. type=sign-in  2. type=sign-up */}

                   {/* sign-up */}

                   {type==='sign-up' && (

                    <>

                            <div className="flex gap-4">
                              <div className="flex-1 min-w-0">
                                <CustomeInput
                                  control={form.control}
                                  name="firstName"
                                  label="First Name"
                                  placeholder="Enter your first name"
                                />
                              </div>

                              <div className="flex-1 min-w-0">
                                <CustomeInput
                                  control={form.control}
                                  name="lastName"
                                  label="Last Name"
                                  placeholder="Enter your last name"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col gap-4">
                              <CustomeInput
                                control={form.control}
                                name="address"
                                label="Address"
                                placeholder="Enter your specific address"
                              />

                              <CustomeInput
                                control={form.control}
                                name="city"
                                label="City"
                                placeholder="Enter your specific city"
                              />
                            </div>

                            
                          <div className="flex gap-4">
                            <div className="flex-1 min-w-0">
                            <CustomeInput
                              control={form.control}
                              name="state"
                              label="State"
                              placeholder="ex:NY"
                              
                            />
                            </div>

                            <div className="flex-1 min-w-0">
                            <CustomeInput
                              control={form.control}
                              name="postalCode"
                              label="Postal Code"
                              placeholder="ex:11101"
                              
                            />
                            </div>
                          </div>


                

                          <div className="flex gap-4">
                            <div className="flex-1 min-w-0">
                            <CustomeInput
                              control={form.control}
                              name="dateOfBirth"
                              label="Date of Birth"
                              placeholder="YYYY-MM-DD"
                              
                            />
                            </div>

                            <div className="flex-1 min-w-0">
                            <CustomeInput
                              control={form.control}
                              name="ssn"
                              label="SSN"
                              placeholder="ex:1234"
                              
                            />
                            </div>
                          </div>
                            
                    
                           
                    </>
                   )}

                <CustomeInput
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  
                />

                <CustomeInput
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  
                />

              {/* <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">
                      Email
                    </FormLabel>

                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input 
                          placeholder="Enter your email"
                          className="input-class"
                          {...field}
                          />
                      </FormControl>
                      <FormMessage className="form-message mt-4"/>
                    </div>

                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">
                      Password
                    </FormLabel>

                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input 
                          placeholder="Enter your password"
                          className="input-class"
                          type="password"
                          {...field}
                          />
                      </FormControl>
                      <FormMessage className="form-message mt-4"/>
                    </div>

                  </div>
                )}
              /> */}


              <div className="flex flex-col gap-4">
                  {/* // when button  is clicked it shows loading to avoid multiple clicking on button */}
                <Button className="form-btn" type="submit" disabled={IsLoading}>
                    {IsLoading?(

                      <>
                          <Loader2  size={20}
                            className="animate-spin"
                            />
                            Loading...
                      </>
                    ) :
                    type==='sign-in'? 'Sign In' :'Sign-Up'
                    
                    }

                </Button>
              </div>
              
            </form>
          </Form>


          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type==='sign-in'?'Dont have an accout':'Already have an account'}
            </p>


            {/* . First line — Where does the link go? */}
            {/*  navigate to the /sign-in route from the root(app) of your website */}
            <Link href={type==='sign-in'?'/sign-up':'/sign-in'} className="form-link">  

            {/* 2. Second line — What text is displayed?  */}
            {type==='sign-in'?'Sign-Up':'Sign-In'}
            
            </Link>

          </footer>
        </>
      )
    }
    </section>
  )
}

export default AuthFom