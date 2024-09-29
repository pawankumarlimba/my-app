'use client';
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
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    try {
      const formData = new FormData();
      formData.append('email', client.email);
      formData.append('password', client.password);
      formData.append('username', client.username);
      formData.append('heading', client.heading);

      if (logo) {
        formData.append('logo', logo);
      }

      const response = await axios.post('/api/admindashbord/addclient', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success("Client added successfully");
        window.location.replace('/admin/dashbord');
      } else {
        toast.error("Client not added");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // Reset loading state after request is complete
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Validate input to allow only alphanumeric characters
    if (/^[a-zA-Z0-9]*$/.test(value) || value === '') {
      setClient({ ...client, username: value });
    }
  };

  return (
    <div className="flex">
      <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black ">
        <h1 className="text-center font-bold text-xl">Add New Client</h1>
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="username">UserName</Label>
            <Input
              id="username"
              placeholder="abcd"
              type="text"
              value={client.username}
              onChange={handleUsernameChange} // Updated to handle username changes
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
            <Label htmlFor="heading">Heading</Label>
            <Input
              id="heading"
              placeholder="Your heading"
              type="text"
              value={client.heading}
              onChange={(e) => setClient({ ...client, heading: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="logo">Logo</Label>
            <Input
              id="logo"
              type="file"
              onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
            />
          </LabelInputContainer>
          <button
            className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable button while loading
            type="submit"
            disabled={loading} 
          >
            {loading ? 'Adding client...' : 'Add Client'} 
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
