import React from 'react'
import { UseFormReturn, FieldPath } from "react-hook-form";

import {
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form";

import {authFormSchema} from '@/lib/utils'


import {z} from "zod"

import { Input } from "@/components/ui/input";
import {
  Control,
  FieldValues,
} from "react-hook-form";

 const formSchema =authFormSchema('sign-up');

 interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  variant?: "auth" | "payment";
}
// const CustomeInput = ({control,name,label,placeholder,}:CustomInputProps) => {
//   return (
//     <FormField
//                 control={control}
//                 name={name}
//                 render={({ field }) => (
//                   <div className="form-item">
//                     <FormLabel className="text-base font-semibold text-gray-800">
//                       {label}
//                     </FormLabel>

//                     <div className="flex w-full flex-col">
//                       <FormControl>
//                         <Input 
//                           placeholder={placeholder}
//                           //className="h-12 text-base"
//                            className="input-class"
//                         type={name==='password'?'password':'text'}
//                           {...field}
//                           />
//                       </FormControl>
//                       <FormMessage className="form-message mt-4"/>
//                     </div>

//                   </div>
//                 )}
//               />
//   )
// }


const CustomeInput =  <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  variant = "auth",
}:CustomInputProps<T>) => {
  return (
    <FormField
                control={control}
                name={name}
                render={({ field }) => (
                  <div className={
                    variant === "payment"
                      ? "payment-transfer_form-item py-5"
                      : "form-item"
                  }
        >
                    <FormLabel className={
                      variant === "payment"
                      ? "text-14 w-full max-w-[280px] font-medium text-gray-700"
                      : "text-base font-semibold text-gray-800"
                    }>
                      {label}
                    </FormLabel>

                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input 
                          placeholder={placeholder}
                          //className="h-12 text-base"
                           className="input-class"
                        type={name==='password'?'password':'text'}
                          {...field}
                          />
                      </FormControl>
                      <FormMessage className="form-message mt-4"/>
                    </div>

                  </div>
                )}
              />
  )
}




















// type CustomInputProps = {
//   control: Control<any>;
//   name: string;
//   label: string;
//   placeholder: string;
//   containerClassName?: string;
//   labelClassName?: string;
//   inputClassName?: string;
//   type?: string;
// };

// const CustomeInput = ({
//   control,
//   name,
//   label,
//   placeholder,
//   containerClassName = "form-item",
//   labelClassName = "text-base font-semibold text-gray-800",
//   inputClassName = "input-class",
//   type,
// }: CustomInputProps) => {
//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <div className={containerClassName}>
//           <FormLabel className={labelClassName}>
//             {label}
//           </FormLabel>

//           <div className="flex w-full flex-col">
//             <FormControl>
//               <Input
//                 placeholder={placeholder}
//                 className={inputClassName}
//                 type={type ?? (name === "password" ? "password" : "text")}
//                 {...field}
//               />
//             </FormControl>

//             <FormMessage className="form-message mt-4" />
//           </div>
//         </div>
//       )}
//     />
//   );
// };



export default CustomeInput