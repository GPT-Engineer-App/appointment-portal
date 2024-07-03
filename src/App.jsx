import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, Calendar, Settings } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // Use sidebar layout
import Index from "./pages/Index.jsx";
import Booking from "./pages/Booking.jsx"; // Import Booking page
import AdminPortal from "./pages/AdminPortal.jsx"; // Import AdminPortal page

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Book Appointment",
    to: "/booking",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Admin Portal",
    to: "/admin",
    icon: <Settings className="h-4 w-4" />, // Add icon for Admin Portal
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="booking" element={<Booking />} />
              <Route path="admin" element={<AdminPortal />} /> {/* Add AdminPortal route */}
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;