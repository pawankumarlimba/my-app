"use client";
import { Button } from '@/components/ui/button';
import { HoverEffect } from "@/components/ui/card-hover-effect";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

interface Webinar {
  name: string;
  message: string;
}

const Page = () => {
  const [Allarts, setAllarts] = useState<Webinar[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post<{ messages: Webinar[] }>('/api/client/clientsidedata');
        setAllarts(response.data.messages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/client/logout');
      toast.success('User logged out successfully');
      console.log(response);
      window.location.replace('/client/login');
    } catch (error) {
      toast.error('Internal error');
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white"></div>
      <div className="p-12 bg-white p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className='p-2 bg-white'>
              <Button onClick={handleLogout} className='float-right m-4'>
                Logout
              </Button>
            </div>
            <p className="mt-2 text-2xl sm:text-3xl text-blue-900 lg:sm:text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">Response</p>
          </div>
          <div className="mt-10">
            <HoverEffect items={Allarts.map(webinar => ({
              name: webinar.name,
              description: webinar.message,
            }))} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
