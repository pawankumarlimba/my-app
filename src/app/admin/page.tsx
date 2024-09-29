'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import Link from 'next/link';


import { toast } from 'react-toastify';




function Page() {
  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/admindashbord/logout');
//nn
        toast.success('Admin logout succesfully');
        console.log(response);
        window.location.replace('/admin/login');
    
    } catch (error) {
      toast.error('internal error ');
      console.log(error);
    }

   
  };

  

  return (<>
    
    <div className="bg-white min-h-screen min-w-screen relative ">
     <div className=" pt-5">
      <div className=''>
     <div className='p-2 bg-white'>
          <Button onClick={handleLogout} className='float-right m-4'>
            Logout
          </Button>
        </div>
        <h1 className="text-2xl md:text-7xl text-center font-sans font-bold">Admin DashBord</h1></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-3">

        <Link href={"/admin/addclient"}>
            <div className="   flex justify-center mr-[-39%] md:mr-0">
            <div className="card w-96 bg-base-100 shadow-xl mb-6 items-center">
            <div className="card-body items-center text-center">
            <h2 className="card-title text-xl ">Add Client</h2> </div>
  <figure className="px-10 pt-10 ">
    <img src="/uploads/1.png" alt="Shoes" className="rounded-xl" />
  </figure>
  
    
</div> 
            </div></Link>
            <Link href={"/admin/deleteclient"}>
            <div className="   flex justify-center  mr-[-39%] md:mr-0">
            <div className="card w-96 bg-base-100 shadow-xl mb-6 items-center">
            <div className="card-body items-center text-center">
            <h2 className="card-title text-xl ">Remove Client</h2> </div>
  <figure className="px-10 pt-10 ">
    <img src="/uploads/4.png" alt="" className="rounded-xl" />
  </figure>

</div>
            </div>
            </Link>
        </div>
        </div>
    
    </div></>
  );
}

export default Page;
// save