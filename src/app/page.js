import { motion } from "framer-motion"
export default function Home1() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center text-lime-400">
      <div className="text-5xl mb-5">Hello Welcome</div>
      <div className="text-xl">This is My Blog Server</div>
      <motion.button
        whileHover={{
          scale: 1.2,
          transition: { duration: 1 },
        }}
        whileTap={{ scale: 0.9 }}
      />
    </div>
  );
}
