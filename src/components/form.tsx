"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authenticateUsername } from "@/app/actions/auth/authenticate-username";

const FormSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9_\s-]+$/,
      "Username can only contain letters, numbers, spaces, hyphens, and underscores"
    )
    .transform((str) => str.trim()),
});

export function UsernameForm({
  setOpen,
  username,
}: {
  username: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: username || "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("username", data.username);

      const result = await authenticateUsername(formData);

      if (result.success) {
        toast.success(`Welcome to the chat, ${result.username}!`);
        setOpen(false);
      } else if (result.unchanged) {
        toast.info("You're already in");
        setOpen(false);
      } else {
        console.log(result.error);
        toast.error(result.error);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending || !!username} />
              </FormControl>
              <FormDescription className="text-white/60">
                This is your public display name.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-sky-500 hover:bg-sky-600"
        >
          {isPending ? "Confirming..." : "Enter"}
        </Button>
      </form>
    </Form>
  );
}
