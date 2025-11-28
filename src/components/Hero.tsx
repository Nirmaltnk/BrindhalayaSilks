"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30 -skew-x-12 translate-x-20 z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0" />

            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.span
                        className="inline-block text-primary font-medium tracking-wider mb-4 uppercase text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Exclusive Collection
                    </motion.span>
                    <motion.h1
                        className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 text-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Weave Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">
                            Dreams in Silk
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        Discover the finest Kanchipuram and Banarasi silk sarees, handpicked for your special moments. Elegance, Tradition, and Style woven into every thread.
                    </motion.p>
                    <motion.div
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 h-12 rounded-full">
                            Explore Collection
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 h-12 rounded-full group">
                            View Lookbook <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Image Content */}
                <motion.div
                    className="relative h-[400px] md:h-[600px] w-full"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2rem] transform rotate-3" />
                    <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50">
                        <Image
                            src="/images/hero.png"
                            alt="Elegant Silk Saree"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                        className="absolute -bottom-6 -left-6 bg-white dark:bg-card p-4 rounded-xl shadow-xl border border-border max-w-xs"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            </div>
                            <div>
                                <p className="font-bold text-foreground">Premium Quality</p>
                                <p className="text-xs text-muted-foreground">100% Pure Silk Certified</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
