import { useQuery } from "@tanstack/react-query"
import apiClient from "../apiClient"
import { useParams } from "react-router-dom"
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

    if (isLoading) return <h1>Loading...</h1>
    if (error) return <p>Error</p>
    if (!data) return <h1>No Users Found</h1>

  return (
    <div>
        <img src={data.avatar} />
        <h1>{data.first_name} {data.last_name}</h1>
        <p>{data.email}</p>
    </div>
  )
}

export default Details