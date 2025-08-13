'use client';
import { motion } from 'framer-motion';
import {
  FaExclamationTriangle,
  FaHome,
  FaLaptop,
  FaUsers,
  FaChalkboardTeacher,
  FaAward,
  FaCheckCircle,
  FaHandshake
} from 'react-icons/fa';

export default function About() {
  const situationPoints = [
    "Coronavirus Lockdown",
    "Stay at Home – No Business, No Job, No Income",
    "Regular Expenses Continue",
    "Price Hike of All Goods"
  ];

  const solutionPoints = [
    { icon: <FaHome />, text: "Work from Home" },
    { icon: <FaLaptop />, text: "Do Smart Work" },
    { icon: <FaUsers />, text: "Build Your Network" },
    { icon: <FaChalkboardTeacher />, text: "Become the Best Trainer" },
    { icon: <FaHandshake />, text: "Help Others & Earn" }
  ];

  const milestones = [
    "2016 Sep – Company Registered",
    "2016 Nov – Online Shoppe Started",
    "2018 Aug – Grocery Supply Started",
    "2019 Mar – Taluk Warehouse Started",
    "2019 Oct – Incorporated as Certified Company",
    "2020 Apr – Crossed 2 Lakh Customers",
    "2020 Jul – Pincode-Wise Agency Stores Launched",
    "2021 Aug – Crossed 11 Lakh Customers"
  ];

  const joinSteps = [
    "Purchase any product from 1st Purchase Bucket",
    "Minimum ₹750 to start earning",
    "200 BV per product",
    "Choose from 20–50+ products (Tea, Coffee, Herbal, General)"
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#0d0f1a] via-[#1a1f2e] to-[#331a0d] text-white overflow-hidden">

      {/* Floating Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 blur-[120px] animate-pulse delay-2000" />

      {/* Situation Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-orange-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent text-center mb-12 animate-[shimmer_3s_infinite]"
        >
          The Situation is Getting Bad to Worse
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.ul
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {situationPoints.map((point, i) => (
              <li key={i} className="flex items-center gap-4 text-lg">
                <FaExclamationTriangle className="text-red-500 text-2xl animate-bounce" />
                <span>{point}</span>
              </li>
            ))}
          </motion.ul>

          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            src="/img/lockdown.jpg"
            alt="Lockdown"
            className="rounded-2xl shadow-[0_0_40px_rgba(255,165,0,0.3)] hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* Solution Section */}
      <div className="bg-white/5 backdrop-blur-lg border-t border-b border-white/10 py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold bg-gradient-to-r from-orange-300 to-yellow-400 bg-clip-text text-transparent text-center mb-14"
          >
            The Solution: Star Rich Platform
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {solutionPoints.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative p-6 rounded-2xl shadow-lg hover:scale-105 transition-all bg-gradient-to-tr from-orange-500/90 to-yellow-500/80 text-center"
              >
                <div className="text-4xl mb-4 text-white drop-shadow-lg hover:rotate-6 transition-transform">
                  {item.icon}
                </div>
                <p className="text-lg font-semibold">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent text-center mb-14"
        >
          Company Milestones
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-orange-500/20 transition-colors"
            >
              <FaAward className="text-orange-400 text-2xl" />
              <span>{m}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Join Section */}
      <div className="bg-white/5 backdrop-blur-lg border-t border-white/10 py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold bg-gradient-to-r from-orange-300 to-yellow-400 bg-clip-text text-transparent text-center mb-14"
          >
            How to Join & Start Earning
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.ul
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              {joinSteps.map((step, i) => (
                <li key={i} className="p-5 flex items-center gap-4 text-lg">
                  <FaCheckCircle className="text-green-400 text-4xl" />
                  <span>{step}</span>
                </li>
              ))}
            </motion.ul>

            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              src="/img/products.jpg"
              alt="Products"
              className="w-full h-full max-w-md mx-auto rounded-2xl shadow-[0_0_40px_rgba(255,165,0,0.3)] hover:scale-105 transition-transform object-cover
"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
