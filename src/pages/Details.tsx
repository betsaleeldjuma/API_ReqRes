import { useQuery } from "@tanstack/react-query"
import apiClient from "../apiClient"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"

interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    avatar: string
}

const fetchUser = async(id: number): Promise<User> => {
    const response = await apiClient.get(`/users/${id}`)
    
    return response.data.data
}

const Details = () => {
    const {id} = useParams<{ id:string }>();
    const userId = id ? Number(id) : undefined;

    const {data, isLoading, error} = useQuery<User>({queryKey: ['user', id], queryFn: () => fetchUser(userId!), enabled: !!id})

    if (isLoading) return <div className="flex justify-center items-center h-screen"><h1 className="text-3xl lg:text-5xl font-extrabold">Loading...</h1></div>
    if (error) return <div className="flex justify-center items-center h-screen"><p className="text-3xl lg:text-5xl font-extrabold">Error</p></div>
    if (!data) return <div className="flex justify-center items-center h-screen"><h1 className="text-3xl lg:text-5xl font-extrabold">No Users Found</h1></div>

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-2">
        <motion.img src={data.avatar} initial={{y: -200, opacity: 0.3, scale: 0.7}} whileInView={{y: 0, opacity: 1, scale: 1}} whileHover={{scale: 1.1, opacity: 0.9}} className="w-70 rounded-full"/>
        <motion.div initial={{y: 200, opacity: 0.5, scale: 0.7}} whileInView={{y: 0, opacity: 1, scale: 1}} className="flex flex-col justify-center items-center">
            <h1 className="text-5xl">{data.first_name} <span className="font-bold">{data.last_name}</span></h1>
            <p className="text-xl text-[#52616B]">{data.email}</p>
        </motion.div>
    </div>
  )
}

export default Details