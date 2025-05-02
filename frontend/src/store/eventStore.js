import { create } from 'zustand'
import axiosInstance from "../lib/axiosInstance";
const useEventStore = create((set) => ({
    isCreating: false,
    isRegistering: false,
    createEvent: async (eventData) => {
        try {
            set({ isCreating: true });
            const response = await axiosInstance.post("/event/create", eventData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            set({ isCreating: false });
            document.getElementById('my_modal_1').showModal();
            return response.data;
        } catch (error) {
            console.error("Error creating event:", error);
            throw error;
        }
    },
    registerEvent: async (eventId) => {
        try {
            set({ isRegistering: true });
            const response = await axiosInstance.post("/event/register", { eventId });
            console.log("Event registration response:", response.data);
            set({ isRegistering: false });

        } catch (error) {
            console.error("Error registering for event:", error);
            throw error;
        }
    }
}))

export default useEventStore;