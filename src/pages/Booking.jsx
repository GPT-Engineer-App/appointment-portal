import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  appointmentDate: z.date().refine((date) => date >= new Date(), "Appointment date must be in the future"),
  appointmentTime: z.string().min(1, "Appointment time is required"),
  serviceType: z.string().min(1, "Service type is required"),
  additionalNotes: z.string().optional(),
});

const Booking = () => {
  const [date, setDate] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    toast("Appointment booked successfully!");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name">Name</label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <Input id="phone" type="tel" {...register("phone")} />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="appointmentDate">Appointment Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.appointmentDate && <p className="text-red-500">{errors.appointmentDate.message}</p>}
        </div>
        <div>
          <label htmlFor="appointmentTime">Appointment Time</label>
          <Input id="appointmentTime" type="time" {...register("appointmentTime")} />
          {errors.appointmentTime && <p className="text-red-500">{errors.appointmentTime.message}</p>}
        </div>
        <div>
          <label htmlFor="serviceType">Service Type</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Consultation">Consultation</SelectItem>
              <SelectItem value="Follow-up">Follow-up</SelectItem>
              <SelectItem value="Therapy">Therapy</SelectItem>
            </SelectContent>
          </Select>
          {errors.serviceType && <p className="text-red-500">{errors.serviceType.message}</p>}
        </div>
        <div>
          <label htmlFor="additionalNotes">Additional Notes</label>
          <Textarea id="additionalNotes" {...register("additionalNotes")} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Booking;