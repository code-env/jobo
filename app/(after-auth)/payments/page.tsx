
import { PlusIcon, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PaymentForm from "@/components/forms/payment-form";
import { User as UserProfile } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import{ db} from "@/lib/db";


const transitionDebug = {
  type: "easeOut",
  duration: 0.2,
};

const Page = async () => {

    const user = await currentUser();

    if (!user) {
      console.log("No user found")
      return
    }

    const userdata = await db.user.findUnique({
        where:{
            clerkId:user.id
        }
    })

    if(!userdata){
        console.log("No user data found")
        return 
        
    }
  return (

    <div className="flex h-[300px] flex-col items-end justify-end pb-4">

      <PaymentForm user= {userdata}/>
      
    </div>
  );
}


export default Page;

// import React from "react";
// import PaymentForm from "@/components/forms/payment-form";
// import { currentUser } from "@clerk/nextjs/server";
// import { User } from "@prisma/client";

// const Payment = async () => {

//   return(
//     <div className="flex h-[300px] flex-col items-end justify-end pb-4">
//       some content here
//     </div>
//   )

// };

// export default Payment;