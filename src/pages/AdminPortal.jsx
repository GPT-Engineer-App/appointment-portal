import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAvailableDays, updateAvailableDays } from "@/api/adminApi";

const formSchema = z.object({
  day: z.string().min(1, "Day is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

const AdminPortal = () => {
  const queryClient = useQueryClient();
  const { data: availableDays, isLoading } = useQuery({
    queryKey: ["availableDays"],
    queryFn: fetchAvailableDays,
  });

  const mutation = useMutation({
    mutationFn: updateAvailableDays,
    onSuccess: () => {
      queryClient.invalidateQueries(["availableDays"]);
      toast("Available days updated successfully!");
    },
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Portal</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="day">Day</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Monday">Monday</SelectItem>
              <SelectItem value="Tuesday">Tuesday</SelectItem>
              <SelectItem value="Wednesday">Wednesday</SelectItem>
              <SelectItem value="Thursday">Thursday</SelectItem>
              <SelectItem value="Friday">Friday</SelectItem>
              <SelectItem value="Saturday">Saturday</SelectItem>
              <SelectItem value="Sunday">Sunday</SelectItem>
            </SelectContent>
          </Select>
          {errors.day && <p className="text-red-500">{errors.day.message}</p>}
        </div>
        <div>
          <label htmlFor="startTime">Start Time</label>
          <Input id="startTime" type="time" {...register("startTime")} />
          {errors.startTime && <p className="text-red-500">{errors.startTime.message}</p>}
        </div>
        <div>
          <label htmlFor="endTime">End Time</label>
          <Input id="endTime" type="time" {...register("endTime")} />
          {errors.endTime && <p className="text-red-500">{errors.endTime.message}</p>}
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Available Days</h2>
        <ul>
          {availableDays.map((day) => (
            <li key={day.id}>
              {day.day}: {day.startTime} - {day.endTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPortal;