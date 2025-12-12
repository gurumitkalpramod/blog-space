"use client";

import { Button } from "@/components/ui/button";
import { Check, Share2 } from "lucide-react";
import { useState } from "react";

export function ShareButton() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link: ", err);
        }
    };

    return (
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
        </Button>
    );
}
