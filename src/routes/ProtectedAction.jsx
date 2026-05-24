import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const defaultMessage = "Create an academy account to track progress and unlock analytics.";

export default function ProtectedAction({
  children,
  message = defaultMessage,
  redirectTo = "/login",
  onBlocked
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const runProtectedAction = (action) => {
    if (isAuthenticated) {
      action?.();
      return true;
    }

    const handled = onBlocked?.(message);
    if (!handled) {
      navigate(redirectTo, {
        state: {
          from: location,
          authMessage: message
        }
      });
    }
    return false;
  };

  return children({ isAuthenticated, runProtectedAction });
}
