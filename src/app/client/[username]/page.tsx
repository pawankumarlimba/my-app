'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from 'next/image';

interface DomainProps {
  params: {
    username: string;
  };
}

interface DomainData {
  heading?: string;
  logo?: string;
}

export default function Domain({ params }: DomainProps) {
  const { username } = params;

  const [domainData, setDomainData] = useState<DomainData | null>(null);
  const [head, setHead] = useState<string>("");
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        try {
          const response = await axios.post('/api/client/domain', { username });
          const data = response.data.data;
          setDomainData(data);
          setHead(data.heading || "");
          setUrl(data.logo || null);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [username]);

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/client/showmessage', {
        username,
        email,
        name,
        message,
      });

      if (response.data.success) {
        toast.success("Message sent successfully");
      } else {
        toast.error("Account not found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col">
      {!domainData ? (
        <div className="flex justify-center items-center text-center h-screen">
          <h1 className="text-2xl sm:text-3xl text-blue-900 lg:sm:text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">This UserName does not exist</h1>
        </div>
      ) : (
        <>
          <div className="flex mt-5 w-[100%] lg:w-[90%] md:w-[98%] mx-auto rounded-none md:rounded-2xl p-4 md:p-3 shadow-input bg-white">
            {url && (
              <div className='w-[90%]'>
                <Image
                  src={url}
                  alt="Description of the image"
                  width={100}
                  height={90}
                />
              </div>
            )}
            <div>
              <p className="text-2xl sm:text-3xl text-blue-900 lg:sm:text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">{head}</p>
            </div>
          </div>
          <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <form className="my-8" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                  <Label htmlFor="firstname">Name</Label>
                  <Input
                    id="firstname"
                    placeholder="Tyler"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="projectmayhem@fc.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </LabelInputContainer>
              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                type="submit"
              >
                Send Response &rarr;
                <BottomGradient />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);
