"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <div className="relative flex items-center justify-center">
                    <motion.div
                        className="absolute h-16 w-16 rounded-full border-4 border-primary/20"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                <motion.p
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                    className="text-sm font-medium tracking-tight text-muted-foreground"
                >
                    Loading...
                </motion.p>
            </div>
        </div>
    );
}