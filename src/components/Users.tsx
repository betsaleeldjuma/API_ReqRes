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
  filteredUsers: User[]
}


const fetchUsers = async (page: number): Promise<UsersResponse> => {
  const response = await apiClient(`/users?page=${page}`)

  return response.data
}

const Users = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const { data, isLoading, error } = useQuery<UsersResponse>({
    queryKey: ["users", page, search],
    queryFn: () => fetchUsers(page),
    placeholderData: (previousData) => previousData
  })

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <p>Error</p>
  if (!data) return <h1>No Users Found</h1>

  const filteredUsers = data?.data.filter(user =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div>
      <input type="text" value={search} onChange={(e) => {
        setSearch(e.target.value)
        setPage(1)
      }} placeholder="Search..." className="border-b- focus:border-[#52616B] rounded-full pl-5 pb-1 pt-1"/>
      {filteredUsers.map((user:User) => (
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
