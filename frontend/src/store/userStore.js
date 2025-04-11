import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance';
// email: "yg292001@gmail.com"
// email_verified: true
// family_name: "Garg"
// given_name: "Yash"
// id: "67e588cabf5d3c204c7f9c5b"
// name: "Yash Garg"
// picture: "https://lh3.googleusercontent.com/a/ACg8ocImy4jM3zNTztKxHGvRcEFfRwkkOcxC3lJjjtQ0Y9NeS2oiW7QN=s96-c"
// sub: "101076041466164809210"
const useUserStore = create((set) => ({
    gid: "",
    id: "",
    name: "",
    setName: (name) => set({ name }),
    info: {},
    setInfo: (data) => {
        console.log(data);
        set({ info: data, name: data.name, gid: data.sub, id: data.id })
    },
    logout: () => {
        localStorage.removeItem("token");
        set({ gid: "", id: "", name: "", info: {} });
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
}))

export default useUserStore;