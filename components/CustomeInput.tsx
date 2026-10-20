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
import {Control } from "react-hook-form"

 const formSchema =authFormSchema('sign-up');

interface CustomInputProps {
control: Control<z.infer<typeof formSchema>>,
name: FieldPath<z.infer<typeof formSchema>>,
label: string,
placeholder: string;
}
const CustomeInput = ({control,name,label,placeholder,}:CustomInputProps) => {
  return (
    <FormField
                control={control}
                name={name}
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="text-base font-semibold text-gray-800">
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

export default CustomeInput