'use client';
import { z } from 'zod';
import { signup } from '../functions/actions/auth/signup';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

const SignUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const signUpForm = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof SignUpFormSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    const { error } = await signup(formData);
    if (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };
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
          <Button type='submit' disabled={isLoading}>
            {isLoading ? <LoaderCircle className='animate-spin' /> : 'Sign Up'}
          </Button>
          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        </form>
      </Form>
    </main>
  );
}
