import {motion} from 'framer-motion'

const Header = () => {
  return (
    <motion.div initial={{x: -50, scale: 0.4}} whileInView={{x: 0, scale: 1}}>
        <h1 className="text-xl lg:text-5xl font-extrabold">API ReqRes</h1>
    </motion.div>
  )
}

export default Header