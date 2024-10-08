'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from 'axios';
import Link from "next/link";
import React, { useState } from 'react';
import { toast } from "react-toastify";

type Client = {
  username: string;
  password: string;
};

export default function AddClient() {
  const [client, setClient] = useState<Client>({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // State for loading

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    try {
      const response = await axios.post('/api/client/login', client);
      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        window.location.replace('/client');
      } else {
        toast.error(response.data.error || "An error occurred");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); // Reset loading state regardless of success or error
    }
  };

  return (
    <div className="flex">
      <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h1 className="text-center font-bold">Client Login</h1>
        <form className="my-8" onSubmit={handleSubmit}>
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={client.password}
              onChange={(e) => setClient({ ...client, password: e.target.value })}
            />
          </LabelInputContainer>
          <button
            className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Loading...' : 'Sign In '}
            <BottomGradient />
          </button>
          <Link href={"/admin/login"}>
            <button
              className="mt-4 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
              type="button"
            >
              Login as Admin &rarr;
              <BottomGradient />
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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
