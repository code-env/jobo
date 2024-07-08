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
import { Textarea } from "@/components/ui/textarea";
// import { createNewNote } from "@/actions/note";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Loading } from "../shared/loading";
import CreateShow from "../forms/create-heack";

const CreateNewHack = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: z.infer<typeof createProjectSchema>) {
    // console.log("something is going on");
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="zbtn" className="w-fit">
          Create new article
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create new article</DialogTitle>
          <DialogDescription>
            Start a new article that&apos;s sync to your terminal
          </DialogDescription>
        </DialogHeader>
        <CreateShow />
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewHack;
