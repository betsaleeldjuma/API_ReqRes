import { useQuery } from "@tanstack/react-query"
import  apiClient from "../apiClient"


interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  avatar: string
}

const fetchData = async () => {
  const response = await apiClient("/users?page=1")

  return response.data.data
}

const Users = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchData
  })

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <p>Error</p>

  return (
    <div>
      {data.map((user:User) => (
        <div key={user.id}>
          <img src={user.avatar} />
          <h1>{user.first_name}</h1>
          <p>{user.last_name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  )
}

export default Users
