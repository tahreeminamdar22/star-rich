// app/contact/page.js
'use client';
import { motion } from 'framer-motion';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter
} from 'react-icons/fa';

export default function Contact() {
  return (
    <section className="relative py-20 px-6 lg:px-20 bg-gradient-to-br from-[#0d0f1a] via-[#1a1f2e] to-[#331a0d] text-gray-100 overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-[28rem] h-[28rem] bg-orange-500/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-yellow-500/20 blur-[120px] animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-orange-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Get in Touch with Us
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Whether you have a question, need assistance, or simply want to explore partnership opportunities,
            our team is ready to help you make the most of your StarRich experience.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg space-y-6"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300/20 rounded-full px-5 py-3 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:shadow-[0_0_20px_rgba(255,165,0,0.3)]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300/20 rounded-full px-5 py-3 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:shadow-[0_0_20px_rgba(255,165,0,0.3)]"
              />
            </div>

            {/* Reason for Contact */}
            <div>
              <label className="block text-sm font-medium mb-1">Reason for Contact</label>
              <select
                className="w-full border border-gray-300/20 rounded-full px-5 py-3 bg-transparent text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:shadow-[0_0_20px_rgba(255,165,0,0.3)]"
              >
                <option value="" className="bg-[#1a1f2e] text-gray-300">Select an option</option>
                <option className="bg-[#1a1f2e] text-gray-300">Request Demo</option>
                <option className="bg-[#1a1f2e] text-gray-300">Make Career</option>
                <option className="bg-[#1a1f2e] text-gray-300">Ready to Buy</option>
                <option className="bg-[#1a1f2e] text-gray-300">Want to Get More Information on Product</option>
                <option className="bg-[#1a1f2e] text-gray-300">Something Else / Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="How can we help you?"
                className="w-full border border-gray-300/20 rounded-2xl px-5 py-3 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:shadow-[0_0_20px_rgba(255,165,0,0.3)]"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-orange-500/40 transition hover:scale-105"
            >
              Send Message →
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-orange-400 text-2xl" />
              <p>123 Franchise Hub Road, Mumbai, MH, India</p>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-orange-400 text-2xl" />
              <p>+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-orange-400 text-2xl" />
              <p>contact@starrich.in</p>
            </div>
            <div className="flex items-center gap-4">
              <FaClock className="text-orange-400 text-2xl" />
              <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.123456789!2d72.87765531542184!3d19.0760909870916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjkiTiA3MsKwNTInNDEuNiJF!5e0!3m2!1sen!2sin!4v1614112345678!5m2!1sen!2sin"
                width="100%"
                height="220"
                allowFullScreen=""
                loading="lazy"
                style={{ border: 0 }}
              ></iframe>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-orange-500 transition-colors"
                >
                  <Icon className="text-white" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
