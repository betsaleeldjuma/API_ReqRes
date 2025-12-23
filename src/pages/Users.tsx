import { useQuery } from "@tanstack/react-query"
import  apiClient from "../apiClient"
import { useState } from "react"


interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  avatar: string
}

interface UsersResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: User[]
}


const fetchUsers = async (page: number): Promise<UsersResponse> => {
  const response = await apiClient(`/users?page=${page}`)

  return response.data
}

const Users = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
    keepPreviousData: true
  })

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <p>Error</p>

  return (
    <div>
      {data.data.map((user:User) => (
        <div key={user.id}>
          <img src={user.avatar} />
          <h1>{user.first_name}</h1>
          <p>{user.last_name}</p>
          <p>{user.email}</p>
        </div>
      ))}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button onClick={() =>setPage(old => Math.min(old + 1, data.total_pages))} disabled={page === data.total_pages}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Users
