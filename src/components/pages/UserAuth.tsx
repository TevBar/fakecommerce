// import React, { useState } from 'react';
// import Login from '../Login';
// import Signup from '../Signup';

// const UserAuth: React.FC = () => {
//   const [isUser, setIsUser] = useState<boolean>(true);

//   const toggleAuthView = (isLogin: boolean): void => {
//     setIsUser(isLogin);
//   };

//   return (
//     <div className='text-center my-[5%] w-screen'>
//       <div className='md:w-max mx-auto px-8 md:px-20 py-9 space-y-14 sm:shadow-2xl bg-white/80 border-2 md:text-lg font-semibold border-white sm:drop-shadow-2xl'>
//         <h1 className='text-xl md:text-3xl font-bold space-x-4 sm:space-x-16 cursor-pointer'>
//           <span
//             onClick={() => toggleAuthView(true)}
//             className={isUser ? 'text-stone-700' : 'text-stone-300'}
//           >
//             Login
//           </span>
//           <span
//             onClick={() => toggleAuthView(false)}
//             className={isUser ? 'text-stone-300' : 'text-stone-700'}
//           >
//             Sign Up
//           </span>
//         </h1>
//         <div className='flex justify-center items-center text-center'>
//           {isUser ? <Login /> : <Signup />}
//         </div>
//         {
//           isUser ? 
//             <div className='text-stone-700 font-normal text-[15px]'>
//               Don't have an account?
//               <span onClick={() => toggleAuthView(false)} className='cursor-pointer text-blue-600'> Sign up</span>
//             </div>
//           :
//             <div className='text-stone-700 font-normal text-[15px]'>
//               Already have an account?
//               <span onClick={() => toggleAuthView(true)} className='cursor-pointer text-blue-600'> Login</span>
//             </div>
//         }
//       </div>
//     </div>
//   );
// };

// export default UserAuth;


import React, { useState, useEffect } from "react";
import Login from "../Login";
import Signup from "../Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { getOrInitializeUserProfile } from "../../services/userService"; // ✅ Updated import

const UserAuth: React.FC = () => {
  const [isUser, setIsUser] = useState<boolean>(true);

  interface UserProfile {
    name?: string;
    email?: string;
  }

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // Store user profile

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getOrInitializeUserProfile(); // ✅ Replaced getUserProfile
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleAuthView = (isLogin: boolean): void => {
    setIsUser(isLogin);
  };

  return (
    <div className="text-center my-[5%] w-screen">
      <div className="md:w-max mx-auto px-8 md:px-20 py-9 space-y-14 sm:shadow-2xl bg-white/80 border-2 md:text-lg font-semibold border-white sm:drop-shadow-2xl">
        <h1 className="text-xl md:text-3xl font-bold space-x-4 sm:space-x-16 cursor-pointer">
          <span
            onClick={() => toggleAuthView(true)}
            className={isUser ? "text-stone-700" : "text-stone-300"}
          >
            Login
          </span>
          <span
            onClick={() => toggleAuthView(false)}
            className={isUser ? "text-stone-300" : "text-stone-700"}
          >
            Sign Up
          </span>
        </h1>

        <div className="flex justify-center items-center text-center">
          {isUser ? <Login /> : <Signup />}
        </div>

        {/* ✅ Display user profile if logged in */}
        {userProfile && (
          <div className="text-stone-700 font-normal text-[15px] mt-5">
            <p>Welcome, {userProfile.name || "User"}!</p>
            <p>Email: {userProfile.email}</p>
          </div>
        )}

        {isUser ? (
          <div className="text-stone-700 font-normal text-[15px]">
            Don't have an account?
            <span
              onClick={() => toggleAuthView(false)}
              className="cursor-pointer text-blue-600"
            >
              {" "}
              Sign up
            </span>
          </div>
        ) : (
          <div className="text-stone-700 font-normal text-[15px]">
            Already have an account?
            <span
              onClick={() => toggleAuthView(true)}
              className="cursor-pointer text-blue-600"
            >
              {" "}
              Login
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAuth;
