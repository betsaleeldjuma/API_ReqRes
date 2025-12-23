import { motion } from "framer-motion"

const Footer = () => {
  return (
    <motion.div initial={{x: 100, scale: 0.5}} whileInView={{x: 0, scale: 1}}>
        <p>Link For Base URL:</p>
        <h1 className="underline font-bold">https://reqres.in/api</h1>
    </motion.div>
  )
}

export default Footer