import {motion} from 'framer-motion'

const Header = () => {
  return (
    <motion.div initial={{x: -100, scale: 0.4}} whileInView={{x: 0, scale: 1}}>
        <h1 className="text-3xl font-extrabold">API ReqRes</h1>
    </motion.div>
  )
}

export default Header