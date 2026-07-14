"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Full Stack Developer",
    image: "AS",
    review:
      "I adopted an abandoned SaaS project through RepoRevive and turned it into my portfolio. The platform made it easy to connect with the original owner and continue development.",
  },
  {
    name: "Priya Verma",
    role: "Startup Founder",
    image: "PV",
    review:
      "Instead of letting our hackathon project go to waste, we found an experienced developer on RepoRevive who joined our team and helped us bring the idea to life.",
  },
  {
    name: "Rohan Gupta",
    role: "Open Source Contributor",
    image: "RG",
    review:
      "The secure ownership transfer and built-in chat made collaborating with project owners simple and transparent. It's a great platform for developers looking for real opportunities.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-20 text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-violet-400">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold text-white">
            Loved By Developers
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Developers, founders and hackathon teams use RepoRevive to
            discover opportunities, collaborate and bring unfinished ideas
            back to life.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {testimonials.map((item, index) => (

            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-violet-500/40"
            >

              <div className="mb-6 flex">

                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              <p className="leading-8 text-gray-400">
                "{item.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-purple-500 text-lg font-semibold text-white">

                  {item.image}

                </div>

                <div>

                  <h4 className="font-semibold text-white">
                    {item.name}
                  </h4>

                  <p className="text-gray-400">
                    {item.role}
                  </p>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}