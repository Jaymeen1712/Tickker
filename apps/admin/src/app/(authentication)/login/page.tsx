"use client";
import { loginAction } from "@/actions/authentication";
import { AuthContainer, CustomButton, CustomErrorAlert } from "@/components";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [isLoginButtonLoading, setIsLoginButtonLoading] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    setIsLoginButtonLoading(true);
    try {
      const response = await loginAction(values);

      if (response?.error) {
        setError(response?.error);
      }
    } finally {
      setIsLoginButtonLoading(false);
    }
  }

  const handleRedirectToSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <AuthContainer title="Login">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-80 space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
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
                    <Input
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <CustomErrorAlert desc={error} />}

            <CustomButton
              type="submit"
              className="w-full bg-blue-primary hover:bg-blue-secondary"
              loading={isLoginButtonLoading}
            >
              Login
            </CustomButton>
          </form>
        </Form>

        <div className="mt-4 flex w-full justify-center space-x-2 text-sm">
          <p>no account, </p>
          <span
            className="cursor-pointer font-semibold text-blue-primary"
            onClick={handleRedirectToSignUp}
          >
            Sign up
          </span>
        </div>
      </AuthContainer>
    </div>
  );
};

export default LoginPage;
