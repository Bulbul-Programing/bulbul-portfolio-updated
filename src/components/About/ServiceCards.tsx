'use client'
import { motion } from 'motion/react';

const services = [
    { title: "Frontend Development", subtitle: "React / Next.js", icon: "🎨" },
    { title: "Backend & API", subtitle: "Node.js / Express / MongoDB", icon: "⚙️" },
    { title: "E-commerce & Payments", subtitle: "Stripe / SSLCommerz", icon: "🛒" },
    { title: "Bug Fixing & Optimization", subtitle: "Performance / SEO", icon: "🚀" },
];
const ServiceCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
            {services.map((s, index) => (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20 + (index * 15),
                    }}
                    viewport={{ once: true }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1 + (.5 + ((index * 3) / 10)),
                        },
                    }}
                    key={s.title}
                >
                    <div

                        className="bg-card border border-border rounded-xl p-6 flex flex-col items-start gap-4 shadow-sm"
                    >
                        <div className="text-2xl">{s.icon}</div>
                        <div>
                            <h3 className="text-lg font-semibold">{s.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{s.subtitle}</p>
                        </div>
                    </div>
                </motion.div>

            ))}
        </div>
    );
};

export default ServiceCards;