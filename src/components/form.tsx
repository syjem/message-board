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
import { handleUsernameSubmit } from "@/app/actions";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
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

      const result = await handleUsernameSubmit(formData);

      if (result.success || result.unchanged) {
        setOpen(false);
      } else {
        console.error(result.error);
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
          {isPending ? "Creating..." : "Enter"}
        </Button>
      </form>
    </Form>
  );
}
