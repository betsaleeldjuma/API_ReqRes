import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface User {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
}

const fetchData = async() => {
  const response = await axios.get('https://reqres.in/api/users?page=1')

  return response.data
}

const Users = () => {
  const {data, isLoading, error} = useQuery({queryKey: ["users"], queryFn: fetchData})

  if(isLoading) return <h1>Loading...</h1>
  if(error) return <p>An Error Occured</p>
  if(!data) return <h1>No Items Found</h1>

  return (
    <div className="grid ">
      {data.map((user: User) => <div key={user.id}>
        <h1>{user.first_name}</h1>
        <p>{user.last_name}</p>
        <p>{user.email}</p>
      </div>)}
    </div>
  )
}

export default Users