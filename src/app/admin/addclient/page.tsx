'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from "react-toastify";

export default function AddClient() {
  const [client, setClient] = useState({
    email: "",
    password: '',
    username: '',
    heading: '',
  });

  const [logo, setLogo] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('email', client.email);
      formData.append('password', client.password);
      formData.append('username', client.username);
      formData.append('heading', client.heading);
      
      if (logo) {
        formData.append('logo', logo);
      }

      // Make POST request to the backend
      const response = await axios.post('/api/admindashbord/addclient', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success("Client added successfully");
        window.location.replace('/admin');
      } else {
        toast.error("Client not added");
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex ">
      <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black ">
        <form className="my-8 " onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="text">UserName</Label>
            <Input
              id="text"
              placeholder="abcd"
              type="text"
              value={client.username}
              onChange={(e) => setClient({ ...client, username: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={client.email}
              onChange={(e) => setClient({ ...client, email: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={client.password}
              onChange={(e) => setClient({ ...client, password: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="text">Heading</Label>
            <Input
              id="text"
              placeholder="abcd"
              type="text"
              value={client.heading}
              onChange={(e) => setClient({ ...client, heading: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Logo</Label>
            <Input
              id="picture"
              type="file"
              onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
            />
          </LabelInputContainer>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Add client
          </button>
        </form>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
