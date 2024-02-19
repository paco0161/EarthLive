"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { useEmailPasswordSignUp } from "@/hooks/api/useEmailPasswordSignUp"
import { signUpFormSchema } from "@/module/auth/validations/sign-up"
import { webConfig } from "@/config/web"

interface ISignUpFormProps {}

const SignUpForm: React.FunctionComponent<ISignUpFormProps> = ({}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const { mutate: createUser } = useEmailPasswordSignUp()
  const onSubmit = (values: z.infer<typeof signUpFormSchema>) => {
    setIsLoading(true)
    createUser(
      {
        email: values.email,
        password: values.password,
        username: values.username,
      },
      {
        onSuccess: (res) => {

        },
        onError: (error: any) => {
        },
        onSettled: () => {
          setIsLoading(false)
        },
      }
    )
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-8"
      >
        <input name="email" />
        <input name="username"/>
        <input name="password"/>
        <input name="confirmPassword"/>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Register"}
        </button>
      </form>
      <p className="mt-4 w-full text-center font-normal ">
        已有帳號？係
        <Link
          href={webConfig.page.signIn.href}
          className="border-b border-foreground"
        >
          呢度登入
        </Link>
      </p>
    </FormProvider>
  )
}

export default SignUpForm