export const fetchAvailableDays = async () => {
  const response = await fetch("/api/available-days");
  if (!response.ok) {
    throw new Error("Failed to fetch available days");
  }
  return response.json();
};

export const updateAvailableDays = async (data) => {
  const response = await fetch("/api/available-days", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update available days");
  }
  return response.json();
};