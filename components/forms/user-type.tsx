"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProjectSchema } from "@/validations";
import { useState } from "react";

const CreateNewProject = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
  });

  async function onSubmit(data: z.infer<typeof createProjectSchema>) {
    console.log("something is going on");
  }

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="zbtn" className="w-fit">
          Create new Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new Project</DialogTitle>
          <DialogDescription>
            Start a new project that&apos;s sync to your terminal
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          ></form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewProject;
