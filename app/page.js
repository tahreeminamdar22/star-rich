'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaUsers,
  FaChartLine,
  FaWallet,
  FaSitemap,
  FaIdCard,
  FaCheckDouble,
  FaRegMoneyBillAlt,
  FaRegClock,
  FaCogs,
  FaUserShield,
  FaProjectDiagram,
  FaGift,
  FaAward,
} from 'react-icons/fa';

const stats = [
  {
    title: 'Total Turnover (Level 20)',
    value: '₹314.5 Cr',
    desc: 'Projected 20-level binary matrix turnover',
    icon: FaChartLine,
  },
  {
    title: 'Concurrent Users Capacity',
    value: '1,00,000+',
    desc: 'Platform ready for high traffic loads',
    icon: FaUsers,
  },
  {
    title: 'Total Team Size at Level 20',
    value: '1,048,576',
    desc: 'Binary structure expansion across 20 levels',
    icon: FaSitemap,
  },
  {
    title: 'Joining Fee',
    value: '₹300',
    desc: 'One-time registration with income activation',
    icon: FaWallet,
  },
  {
    title: 'KYC Verifications Completed',
    value: '90,000+',
    desc: 'Aadhaar, PAN & Bank verified users',
    icon: FaIdCard,
  },
  {
    title: 'Highest Monthly Enrolments',
    value: '75,000+',
    desc: 'Single month user registrations',
    icon: FaCheckDouble,
  },
  {
    title: 'Daily Payout Limit',
    value: '₹5,00,000',
    desc: 'Manual & automatic withdrawals',
    icon: FaRegMoneyBillAlt,
  },
  {
    title: 'Order Processing Speed',
    value: '12,000/min',
    desc: 'Automated matching & payout engine',
    icon: FaRegClock,
  },
];

const banners = [
  {
    img: '/img/banner1.png',
    title: 'Empowering Financial Growth',
    subtitle: 'Digital Direct Selling with 20-Level Income Potential',
    description:
      'Join Star Rich Helping Foundation — a binary-based income platform with rewards, fast payouts, and a vision to make financial opportunities accessible for everyone.',
  },
  {
    img: '/img/banner2.png',
    title: 'From Registration to Rewards',
    subtitle: 'Your Growth Journey Starts at ₹300',
    description:
      'Activate your income by introducing just 2 direct members. Expand your team, unlock levels, and earn through profits, rewards, and achievements.',
  },
];

const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: 'spring', stiffness: 50 },
  }),
};

export default function Home() {
  const [current, setCurrent] = useState(0);

  const prevBanner = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);
  const nextBanner = () => setCurrent((c) => (c + 1) % banners.length);

  return (
    <main className="bg-gradient-to-br from-[#0d0f1a] via-[#1a1f2e] to-[#331a0d] text-gray-100 min-h-screen">
      {/* BANNER */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-screen px-6 lg:px-12">
        {/* Blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-500 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-yellow-500 opacity-20 rounded-full blur-3xl" />

        {/* Arrows */}
        <button
          onClick={prevBanner}
          aria-label="Previous Banner"
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          ←
        </button>
        <button
          onClick={nextBanner}
          aria-label="Next Banner"
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          →
        </button>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">{banners[current].title}</h1>
            <h2 className="mt-2 text-2xl lg:text-3xl text-orange-400 font-semibold">{banners[current].subtitle}</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">{banners[current].description}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-full border border-orange-500 text-orange-400 hover:bg-orange-500/20 font-semibold transition transform hover:scale-105">
                Learn More →
              </button>
              <button className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 shadow-lg shadow-orange-900/50 transition transform hover:scale-105">
                Join Now →
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <Image
              src={banners[current].img}
              alt="Banner"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg transition-transform hover:scale-105"
              priority
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 lg:px-20">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-orange-400">Star Rich By The Numbers</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ title, value, desc, icon: Icon }, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-md border border-white/10 hover:shadow-xl transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className="text-3xl text-orange-400 flex-shrink-0" />
                <h3 className="text-sm font-semibold text-white">{title}</h3>
              </div>
              <p className="text-3xl font-bold text-orange-400">{value}</p>
              <p className="text-sm text-gray-400 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white/5 backdrop-blur-lg border-t border-white/10 py-20 px-6 lg:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6 text-orange-400">About Star Rich</h2>
          <p className="text-lg text-gray-300 mb-12">
            Star Rich Helping Foundation is a binary-based income platform operating on a 20-level matrix.
            With just ₹300, members can activate income, access a user-friendly dashboard, and grow their team for exponential earnings and rewards.
          </p>
        </div>
        <div className="grid max-w-6xl mx-auto md:grid-cols-3 gap-8">
          {[
            {
              title: 'Mission',
              desc: 'To democratize financial opportunity through a transparent, no-code shopping and income platform accessible to all.',
              style: 'bg-white/5 border border-white/10',
              textColor: 'text-orange-400',
            },
            {
              title: 'Vision',
              desc: 'To become India’s most trusted direct-selling ecosystem powered by digital innovation and real-time growth strategies.',
              style: 'bg-orange-500/90 text-white',
            },
            {
              title: 'Values',
              descList: ['Transparency', 'Empowerment', 'Inclusivity', 'Speed', 'Integrity'],
              style: 'bg-white/5 border border-white/10',
              textColor: 'text-orange-400',
            },
          ].map(({ title, desc, descList, style, textColor }, i) => (
            <div
              key={i}
              className={`${style} p-6 rounded-2xl shadow hover:shadow-xl transition`}
            >
              <h3 className={`text-xl font-bold mb-3 ${textColor || 'text-white'}`}>{title}</h3>
              {desc && <p className="text-gray-300">{desc}</p>}
              {descList && (
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  {descList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES & PLAN */}
      <section className="py-20 px-6 lg:px-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-orange-400">Why Choose High Rich?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: FaProjectDiagram,
              title: 'Earn While You Shop',
              desc: 'Every purchase you make doesn’t just get you quality products — it also builds your income. Turn everyday shopping into a steady earning stream.',
            },
            {
              icon: FaCogs,
              title: 'Low Entry, High Potential',
              desc: 'Get started with just ₹300 and unlock unlimited earning possibilities through our simple, rewarding system designed for everyone.',
            },
            {
              icon: FaUserShield,
              title: 'Teamwork Rewards',
              desc: 'Invite friends, build your network, and watch your rewards grow. The bigger your team, the greater the benefits you enjoy together.',
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-white/5 p-6 rounded-2xl backdrop-blur-lg border border-white/10 shadow hover:shadow-xl transition hover:scale-105 cursor-default"
            >
              <Icon className="text-4xl text-orange-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INCOME & REWARDS PLAN */}
      <section className="py-20 px-6 lg:px-20 bg-gradient-to-br from-[#0d0f1a] via-[#1a1f2e] to-[#331a0d] text-white max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-4xl font-extrabold text-center mb-12 text-orange-400"
        >
          How Our Income & Rewards Plan Works
        </motion.h2>

        {/* Binary Income */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-2xl font-bold text-yellow-400 mb-4"
          >
            <FaUsers size={28} />
            1. Binary Income
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 mb-4"
          >
            Start with just{' '}
            <span className="font-semibold text-orange-400">₹300</span> and grow your
            network. Invite <span className="font-semibold">2 direct members</span> to activate your earnings, then watch your income expand across{' '}
            <span className="font-semibold">20 levels</span>.
          </motion.p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            {[
              'Each level doubles your team size and potential turnover.',
              'You earn a share from every member in your network — even those brought in by your team.',
              'Simple structure, easy duplication, unlimited growth potential.',
            ].map((text, i) => (
              <motion.li
                key={i}
                custom={i}
                variants={listItemVariants}
                className="hover:text-orange-400 cursor-pointer transition"
              >
                {text}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Rewards System */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <motion.h3
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-2xl font-bold text-yellow-400 mb-4 justify-start"
          >
            2. Rewards & Achievements
            <FaGift size={28} />
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 mb-4 text-right"
          >
            From <span className="font-semibold">Level 5 onwards</span>, top achievers unlock exciting rewards.
            These are funded from <span className="font-semibold">25% of the company fund</span> collected at each level.
          </motion.p>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {[
              {
                title: 'Beginner to Learner',
                icon: <FaAward size={24} className="text-orange-300" />,
                desc: 'Start your journey and unlock your first incentives quickly.',
              },
              {
                title: 'Bronze to Diamond',
                icon: <FaGift size={24} className="text-orange-300" />,
                desc: 'Progress through ranks to claim premium gadgets, cash bonuses, and more.',
              },
              {
                title: 'Ambassador & Beyond',
                icon: <FaUsers size={24} className="text-orange-300" />,
                desc: 'Top tier achievers enjoy cars, international trips, and luxury rewards.',
              },
            ].map(({ title, icon, desc }, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60 } },
                }}
                className="bg-white/5 p-6 rounded-xl backdrop-blur-lg border border-white/10 shadow hover:shadow-orange-500/40 transition hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  {icon}
                  <h4 className="text-lg font-semibold text-orange-300">{title}</h4>
                </div>
                <p className="text-gray-300">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 80 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-orange-700/50 transition transform hover:scale-105"
          >
            Join Star Rich Today
          </a>
        </motion.div>
      </section>
    </main>
  );
}
