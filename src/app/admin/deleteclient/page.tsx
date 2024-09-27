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
  totalform:number;
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
        setAllarts(Allarts.filter(client => client._id !== id)); 
      } else {
        toast.error('Failed to remove client.');
      }
    } catch (error) {
      console.error('Error removing client:', error);
      toast.error('Internal error occurred. Please try again.');
    }
    
  };

  return (
    <div className='bg-white min-h-screen min-w-screen'>
      <h1 className="mt-5 text-2xl md:text-7xl text-center font-sans font-bold">Total Client {Allarts.length}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 py-10'>
        {Allarts.map((user) => (
          <div className='flex justify-center' key={user._id}>
            <BackgroundGradient className='rounded-[22px] w-[80vw] sm:w-[25vw] p-4 sm:p-10 bg-white dark:bg-zinc-900'>
              <div>
                <h2 className='text-xl font-bold mb-1 truncate '>
                 username: {user.username}
                </h2>
            
                <p className='text-gray-600 truncate '>
                 email: {user.email}
                </p>
                <p className='text-gray-600 truncate '>
                 Total No. Forms: {user.totalform}
                </p>
              </div>
              <button
                onClick={() => handleartremove(user._id)} 
                className='rounded-full pl-3 pr-3 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800'
              >
                Remove 
              </button>
            </BackgroundGradient>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
