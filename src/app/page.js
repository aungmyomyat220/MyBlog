'use client'
import { motion } from "framer-motion"
export default function Home1() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center text-lime-400">
      <motion.div 
      whileHover={{
        scale: 2,
        transition: { duration: 2 },
      }}
      className="text-5xl mb-5">Hello Welcome</motion.div>
    </div>
  );
}
