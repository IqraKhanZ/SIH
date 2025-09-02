import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("railway-auth");
    if (isLoggedIn) {
      // User is logged in, stay on dashboard (this component shouldn't render but just in case)
      return;
    } else {
      // User is not logged in, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-railway-blue mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
};

export default Index;
