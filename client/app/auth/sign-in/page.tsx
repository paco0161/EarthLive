"use client";
import AuthForm from "@/components/forms/auth-form";
import { webConfig } from "@/config/web";
import { supabase } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/");
      }
    };
    checkSession();
  });

  supabase.auth.onAuthStateChange((event) => {
    if (event == "SIGNED_IN") {
      router.push("/");
    }
  });
      
  return (
    <div className="w-full relative text-gray-500 h-full flex flex-wrap justify-center items-center text-center">
        <div className="flex h-full flex-col items-center justify-center">
        <AuthForm />
        <p className="mt-8 w-full text-center  font-normal ">
          未有帳號？係
          <Link
            href={webConfig.page.signUp.href}
            className="border-b-2 border-foreground"
          >
            呢度註冊
          </Link>
        </p>
      </div>
    </div>
  )
}
