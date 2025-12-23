import { useQuery } from "@tanstack/react-query"
import  apiClient from "../apiClient"
import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "./Header"
import {motion} from 'framer-motion'
import Footer from "./Footer"


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

  if (isLoading) return <div className="flex justify-center items-center h-screen"><h1 className="text-3xl lg:text-5xl font-extrabold">Loading...</h1></div>
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-3xl lg:text-5xl font-extrabold">Error</p></div>
  if (!data) return <div className="flex justify-center items-center h-screen"><h1 className="text-3xl lg:text-5xl font-extrabold">No Users Found</h1></div>

  const filteredUsers = data?.data.filter(user =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex justify-between">
        <Header />
        <motion.input type="text" initial={{x: 100, scale: 0.4}} whileInView={{x: 0, scale: 1}} value={search} onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }} placeholder="Search..." className="border border-t-0 border-l-0 border-r-0 shadow-sm border-b-[#52616B] focus:border-[#52616B] rounded-full pl-3 grid "/>
      </div>
      <div className="grid gap-4">
        {filteredUsers.map((user:User) => (
          <motion.div initial={{x: -100, scale: 0.7, opacity: 0.7}} whileInView={{x: 0, scale: 1, opacity: 1}} whileHover={{scale: 1.1}} key={user.id} className="bg-[#C9D6DF] rounded-lg p-5 flex items-center gap-2 shadow-lg">
            <img src={user.avatar} className="rounded-full"/>
            <div>
              <h1>{user.first_name} <span className="font-bold">{user.last_name}</span></h1>
              <p>{user.email}</p>
              <Link to={`/home/${user.id}`} className="underline text-[#52616B] hover:text-black">View description</Link>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-2" style={{ marginTop: 20 }}>
        <motion.div initial={{x: -100, scale: 0.5}} whileInView={{x: 0, scale: 1}}>
          <motion.button whileHover={{scale: 1.05}} onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1} className="bg-[#C9D6DF] p-2 rounded-l-full">
            Prev
          </motion.button>
          <motion.span initial={{y: -50, scale: 0.6}} whileInView={{y: 0, scale: 1}} style={{ margin: "0 10px" }} className="font-extrabold">Page {page}</motion.span>
          <motion.button whileHover={{scale: 1.05}} onClick={() =>setPage(old => Math.min(old + 1, data.total_pages))} disabled={page === data.total_pages} className="bg-[#C9D6DF] p-2 rounded-r-full">
            Next
          </motion.button>
        </motion.div>
        <Footer />
      </div>
    </div>
  )
}

export default Users
