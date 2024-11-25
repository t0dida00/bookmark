import { login } from "@/app/store/reducers/authSlice";
import { fetchBookmarks } from "@/app/store/reducers/bookMarksSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const withAuth = (WrappedComponent, options = { redirectIfAuthenticated: false, redirectTo: "/login" }) => {
  const HOC = (props) => {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const dispatch = useDispatch();
    const { redirectIfAuthenticated = false, redirectTo = "/login" } = options; // Default values applied here
    const bookmarksStatus = useSelector((state) => state.bookmarks.status);
    const userData = useSelector((state) => state.bookmarks);
    useEffect(() => {
      if (sessionStatus == "loading") {
        return
      }
      else if (sessionStatus == "authenticated") {
        if (bookmarksStatus === 'idle') {
          dispatch(fetchBookmarks(session.user.email));
        }
        dispatch(
          login({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          })
        );

        if (redirectIfAuthenticated) {
          router.push('/'); // Redirect to login page if not authenticated
        }

      }
      else if (sessionStatus === "unauthenticated") {
        router.push('/login');
      }
    }, [sessionStatus, router, bookmarksStatus, dispatch]);
    if (sessionStatus == 'loading') {
      return (
        null)
    }

    return <WrappedComponent {...props} session={session} />;
  };

  return HOC;
};

export default withAuth;