import { login } from "@/app/store/reducers/authSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const withAuth = (WrappedComponent, options = { redirectIfAuthenticated: false, redirectTo: "/login" }) => {
  return (props) => {
    const { data: session, status: sessionStatus } = useSession(); // Use session status
    const router = useRouter();
    const dispatch = useDispatch();

    // Destructure options for better readability
    const { redirectIfAuthenticated, redirectTo } = options;

    useEffect(() => {
      if (sessionStatus === "loading") return; // Skip during loading phase
      if (session && redirectIfAuthenticated) {

        router.push("/"); // Redirect to home if user is authenticated
        dispatch(
          login({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          })
        );

      } else if (!session && !redirectIfAuthenticated) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    }, [session, sessionStatus, redirectIfAuthenticated, redirectTo, router]);  // Render the wrapped component if authentication conditions are met

    if (sessionStatus === "loading") {
      return (
        <div className="h-screen w-full flex items-center justify-center">
          Loading...
        </div>
      );
    }

    return <WrappedComponent {...props} session={session} />
  };
};

export default withAuth;
