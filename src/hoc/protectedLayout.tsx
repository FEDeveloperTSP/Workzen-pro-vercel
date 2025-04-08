"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ProtectedLayout = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  
  useEffect(() => {
    const userRole = Cookies.get("role");
    setRole(userRole || null)

    if (!userRole) {
      router.replace("/login");
    } else if (!allowedRoles.includes(userRole)) {
      router.replace(`/${userRole}/dashboard`);
    }
  }, [router]);

  if (role && !allowedRoles.includes(role)) {
    router.back()
    return
  }

  return <>{role && allowedRoles.includes(role) ? children : null}</>;
};

export default ProtectedLayout;
