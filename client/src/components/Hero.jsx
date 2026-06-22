import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";
import { useEffect, useState } from "react";

export const Hero = () => {
  // Set your Ganesh festival date here
  const targetDate = new Date("2026-09-07T00:00:00");

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-festive text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,.28),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,.08),transparent_25%)]" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col justify-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
            <Sparkles size={16} />
            {siteConfig.ownerName} presents the festive murti collection
          </span>

          <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
            {siteConfig.heroTitle}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-stone-100/90">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#products"
              className="btn-primary bg-white text-stone-900 hover:text-stone-900"
            >
              Browse Models <ArrowRight size={18} />
            </a>

            <Link
              to="/admin"
              className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white/40"
            >
              Admin Dashboard
            </Link>
          </div>
        </motion.div>

        {/* Right Side - Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex items-center justify-center"
        >
          <div className="glass-panel w-full max-w-md rounded-3xl p-8 text-center bg-white/10 backdrop-blur-lg border border-white/20">
            <h2 className="text-3xl font-bold mb-6">
              Ganesh Chaturthi Countdown
            </h2>

            <div className="grid grid-cols-4 gap-4">
              <div className="rounded-xl bg-black/30 p-4">
                <div className="text-3xl font-bold">{timeLeft.days}</div>
                <div className="text-sm">Days</div>
              </div>

              <div className="rounded-xl bg-black/30 p-4">
                <div className="text-3xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm">Hours</div>
              </div>

              <div className="rounded-xl bg-black/30 p-4">
                <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm">Minutes</div>
              </div>

              <div className="rounded-xl bg-black/30 p-4">
                <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm">Seconds</div>
              </div>
            </div>

            <p className="mt-6 text-stone-200">
              Celebrate Ganesh Chaturthi with our premium murti collection.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};