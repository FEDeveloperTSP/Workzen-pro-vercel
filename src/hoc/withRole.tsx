import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const withRole = (WrappedComponent: any, allowedRoles: string[]) => {
  return (props: any) => {
    const router = useRouter();
    const user = useSelector((state: any) => state.auth.user);

    useEffect(() => {
      if (!user) {
        router.replace("/login"); // Redirect if not logged in
      } else if (!allowedRoles.includes(user.role)) {
        router.replace(`/${user.role}/dashboard`); // Redirect unauthorized users
      }
    }, [user, router]);

    return user && allowedRoles.includes(user.role) ? <WrappedComponent {...props} /> : null;
  };
};

export default withRole;
