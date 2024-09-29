'use client';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Webinar {
  _id: string;
  username: string;
  logo: string; 
  heading: string;
  email: string;
  totalform: number;
  isBlacklisted: boolean;
}

function Page() {
  const [Allarts, setAllarts] = useState<Webinar[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: Webinar[] }>(
          '/api/admindashbord/showallclient'
        );
        console.log(response.data.data);
        setAllarts(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch client data. Please try again later.'); 
      }
    };

    fetchData();
  }, []);

  const handleartremove = async (id: string) => {
    try {
      const response = await axios.post('/api/admindashbord/deleteclient', { id });
      if (response.data.success) {
        toast.success('Client removed successfully.');
        window.location.reload();
      } else {
        toast.error('Failed to remove client.');
      }
    } catch (error) {
      console.error('Error removing client:', error);
      toast.error('Internal error occurred. Please try again.');
    }
  };

  const toggleBlacklistStatus = async (id: string, isBlacklisted: boolean) => {
    try {
      const endpoint = isBlacklisted
        ? '/api/admindashbord/unblacklist'
        : '/api/admindashbord/blacklist';

      const response = await axios.post(endpoint, { id });
      if (response.data.success) {
        toast.success(
          isBlacklisted ? 'Client unblacklisted successfully.' : 'Client blacklisted successfully.'
        );
        setAllarts(Allarts.map(client => 
          client._id === id ? { ...client, isBlacklisted: !client.isBlacklisted } : client
        ));
        window.location.reload();
      } else {
        toast.error(
          isBlacklisted ? 'Failed to unblacklist client.' : 'Failed to blacklist client.'
        );
      }
    } catch (error) {
      console.error('Error toggling blacklist status:', error);
      toast.error('Internal error occurred. Please try again.');
    }
  };

  return (
    <div className='bg-white min-h-screen min-w-screen'>
      <h1 className="mt-5 text-2xl md:text-7xl text-center font-sans font-bold">Total Clients: {Allarts.length}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 py-10'>
        {Allarts.map((user) => (
          <div className='flex justify-center' key={user._id}>
            <BackgroundGradient className='rounded-[22px] w-[80vw] sm:w-[25vw] p-4 sm:p-10 bg-white dark:bg-zinc-900'>
              <div>
                <h2 className='text-xl font-bold mb-1 truncate'>Username: {user.username}</h2>
                <p className='text-gray-600 truncate'>Email:{user.email}</p>
                <p className='text-gray-600 truncate'>Total No. Forms: {user.totalform}</p>
                <p className='text-gray-600 truncate'>
                  Blacklisted: {user.isBlacklisted ? 'Yes' : 'No'}
                </p>
                <p className='text-gray-600 '>Domain:https://my-app-two-delta-88.vercel.app/client/{user.username}</p>
              </div>
              <div className='flex space-x-3'>
                <button
                  onClick={() => handleartremove(user._id)}
                  className='rounded-full pl-3 pr-3 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800'
                >
                  Remove
                </button>
                <button
                  onClick={() => toggleBlacklistStatus(user._id, user.isBlacklisted)}
                  className='rounded-full pl-3 pr-3 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800'
                >
                  {user.isBlacklisted ? 'Unblacklist' : 'Blacklist'}
                </button>
              </div>
            </BackgroundGradient>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
