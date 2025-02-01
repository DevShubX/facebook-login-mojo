'use client'
import FaceBookLogoutButton from "@/components/FacebookLogoutButton";
import FaceBookPageInfo from "@/components/FacebookPageInfo";
import { signOut, useSession } from "next-auth/react";

export default function Home() {

  const {data : session} = useSession();

  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {session ? (
        <div className="flex flex-col items-center gap-y-5">
          <img src={session.user?.image || ""} alt="Profile Pic" className="w-[100px] h-[100px] rounded-full" />
          <p className="text-xl ">
            Welcome, {session.user?.name}
          </p>
          <FaceBookLogoutButton/>
        </div>
      ): (
        <div>
          Loading...
        </div>
      )}

      <FaceBookPageInfo/>
    </div>
  );
}
