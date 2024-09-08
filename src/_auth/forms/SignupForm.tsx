import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from '@/lib/validation'
import { z } from 'zod'
import Loader from '@/components/shared/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { createUserAccount } from '@/lib/appwrite/api'
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutations'
// import {AuthContext} from '@/context/AuthContext'
import {createContext, useContext } from 'react'
import { IUser } from "@/types";
import { AuthContext } from '@/context/Try'
import { useUserContext } from '@/context/Try'

const SignupForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      name :"",
      email:"",
      password:"",
    },
  })
  

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount()
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount()
  


 async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values)
    if(!newUser){
      return toast({
        title: "sign up faild, please try again"
      })
    }
    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if (!session) {
      return toast({
        title:'sign in faild, please try again.'
      })
    }

    const isLogggedIn = await checkAuthUser()

    if (isLogggedIn) {
      form.reset()
      navigate('/')
    }else{
      return toast({ title: 'Sign up failed, please try again.'})
    }
  }

  return (
      <Form {...form}>
        <div className='sm:w-420 flex-center flex-col '>
          <img src="/assets/images/logoo.png" alt="logo" className='w-24  pt-2' />

          <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>
            Create a new account 
          </h2>
          <p className='text-light-3 small-medium md:base-regular'>
            To use connectify enter your  details
          </p>

        
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' className='shad-input' {...field} />  
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' className='shad-input' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className='shad-button_primary'>
          {isCreatingAccount ?  (
            <div className='flex-center gap-2 '>
              <Loader /> Loading..
            </div>
          ): "sign up"
        }
        </Button>
        
        <p className='text-sm text-light-2 text-center mt-2'>
          Already have an account ? 
          <Link to="/sign-in" className='text-primary-500 text-sm font-semibold ml-1'>
            Log in
          </Link>
        </p>
      </form>

      </div>
    </Form>
   
  )
}

export default SignupForm
