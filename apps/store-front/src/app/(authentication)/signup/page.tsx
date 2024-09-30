"use client";
import { signUpAction } from "@/actions";
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
import { useToast } from "@/components/ui/use-toast";
import { SignUpFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignUpPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [isRegisterButtonLoading, setIsRegisterButtonLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    setIsRegisterButtonLoading(true);
    try {
      const response = await signUpAction(values);

      if (response?.error) {
        setError(response?.error);
      } else {
        toast({
          title: "User is successfully registered.",
        });
        router.push("/login");
      }
    } finally {
      setIsRegisterButtonLoading(false);
    }
  }

  const handleRedirectToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <AuthContainer title="Sign Up">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-80 space-y-8"
          >
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
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
              loading={isRegisterButtonLoading}
            >
              Register
            </CustomButton>
          </form>
        </Form>

        <div className="mt-4 flex w-full justify-center space-x-2 text-sm">
          <p>have account? </p>
          <span
            className="cursor-pointer font-semibold text-blue-primary"
            onClick={handleRedirectToLogin}
          >
            Login
          </span>
        </div>
      </AuthContainer>
    </div>
  );
};

export default SignUpPage;
