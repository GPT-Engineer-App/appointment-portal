import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Appointment Booking</h1>
      <p className="mb-6">Book your appointments easily and quickly.</p>
      <Button onClick={() => navigate("/booking")}>Book Appointment</Button>
    </div>
  );
};

export default Index;