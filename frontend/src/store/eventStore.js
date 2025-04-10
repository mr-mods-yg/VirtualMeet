import { create } from 'zustand'
import axiosInstance from "../lib/axiosInstance";
const useEventStore = create(() => ({
    createEvent: async (eventData) => {
        try {
            const response = await axiosInstance.post("/event/create", eventData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error creating event:", error);
            throw error;
        }
    },
    registerEvent: async (eventId) => {
        try {
            const response = await axiosInstance.post("/event/register", { eventId });
            console.log("Event registration response:", response.data);
        } catch (error) {
            console.error("Error registering for event:", error);
            throw error;
        }
    }
}))

export default useEventStore;