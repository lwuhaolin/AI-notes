"use client";

import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { LoginUserAction, SignUpAction } from "@/actions/users";

type Props = {
  type: "login" | "signUp";
};

function AuthForm({ type }: Props) {
  const isLoginform = type === "login";
  const router = useRouter();
  const [isPanding, startTransition] = useTransition();
  const headleSubmit = (formdata: FormData) => {
    startTransition(async () => {
      const email = formdata.get("email") as string;
      const password = formdata.get("Password") as string;
      let errorMessage;
      let title;
      let description;
      if (isLoginform) {
        errorMessage = (await LoginUserAction(email, password));
        title = "Logged In";
        description = "You have successfully logged in.";
      } else {
        errorMessage=(await SignUpAction(email, password)) ;
        title = "Signed Up";
        description = "Cheaks your email for a verification link.";
      }
      console.log(errorMessage)
      if (errorMessage) {
        // toast(title, { description: description });
        console.log(title,222);
        router.push("/");
      } else {
        // toast(title,{description:errorMessage});
        console.log(errorMessage,111);
      }
    });
  };
  return (
    <form action={headleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your Email"
            type="email"
            required
            disabled={isPanding}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="Password">Password</Label>
          <Input
            id="Password"
            name="Password"
            placeholder="Enter your Password"
            type="Password"
            required
            disabled={isPanding}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPanding ? (
            <Loader2 className="animate-spin" />
          ) : isLoginform ? (
            "login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-xs">
          {isLoginform
            ? "Don't have an account yet?"
            : "Alreadly have an account?"}{" "}
          <Link
            href={isLoginform ? "/sign-up" : "/login"}
            className={`text-blue-500 underline ${isPanding ? "pointer-event-none opacity-50" : ""}`}
          >
            {isLoginform ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
