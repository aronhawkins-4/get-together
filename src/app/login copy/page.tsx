'use client';
import { z } from 'zod';
import { login } from '../functions/actions/auth/login';
import { signup } from '../functions/actions/auth/signup';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

const SignUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginPage() {
  const signUpForm = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <main className='flex justify-center items-center h-screen'>
      <Form {...signUpForm}>
        <form onSubmit={signUpForm.handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full max-w-md'>
          <FormField
            control={signUpForm.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='get@together.com' {...field} type='email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signUpForm.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='********' {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Sign Up</Button>
        </form>
      </Form>
    </main>
  );
}
