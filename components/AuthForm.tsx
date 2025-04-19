"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import FormField from "./FormFeild";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (types: FormType) => {
  return z.object({
    name:
      types === "sign-up" ? z.string().min(3).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8).max(50),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit() {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (type === "sign-up") {
        toast.success("Account created successfully!", {
          duration: 3000,
          position: "top-center",
        });
        // Wait for toast to show before navigating
        setTimeout(() => router.push("/sign-in"), 1000);
      } else {
        toast.success("Signed in successfully!", {
          duration: 3000,
          position: "top-center",
        });
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        duration: 3000,
        position: "top-center",
      });
      console.error("Error submitting form:", error);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[500px]">
      <div className="flex flex-col gap-6 card p-10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={38} height={32} />
            <h2 className="text-primary-100 text-2xl font-bold">PrepWise</h2>
          </div>
          <h3 className="text-muted-foreground">
            Practice Job Interviews with AI
          </h3>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Username"
                placeholder="Your Name"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter Password"
              type="password"
            />

            <Button className="w-full" type="submit" size="lg">
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm mt-4">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-primary hover:underline"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;