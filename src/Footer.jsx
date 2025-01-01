"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const blurLayers = [
    {
        zIndex: 1,
        blur: "0.078125px",
        mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%)",
    },
    {
        zIndex: 2,
        blur: "0.15625px",
        mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%)",
    },
    {
        zIndex: 3,
        blur: "0.3125px",
        mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%)",
    },
    {
        zIndex: 4,
        blur: "0.625px",
        mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%)",
    },
    {
        zIndex: 5,
        blur: "1.25px",
        mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%)",
    },
    {
        zIndex: 6,
        blur: "2.5px",
        mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)",
    },
    {
        zIndex: 7,
        blur: "5px",
        mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100%)",
    },
    {
        zIndex: 8,
        blur: "10px",
        mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100%)",
    },
];

const footerSocials = [
    { icon: FaXTwitter, href: "https://x.com/Abinanthan24" },
    { icon: FaGithub, href: "https://github.com/Abinanthan47" },
];

const footerLinks = {
    product: [
        { text: "Home", href: "/" },
        { text: "Collection", href: "/collection" },
      
    ],
    company: [
        { text: "Terms and Conditions", href: "#" },
        { text: "Privacy Policy", href: "#" },
    ],
    support: [
        { text: "Contact us", href: "#" },
        { text: "About us", href: "#" },
    ],
};

const Footer = () => {
    const footerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end start"],
    });

    const yOffset = useTransform(scrollYProgress, [0, 1], [-70, 80]);

    return (
        <footer className="w-full" ref={footerRef}>
            <div className="max-w-7xl mx-auto pb-2 mt-12 relative">
                <div className="grid items-center justify-center relative overflow-hidden">
                    <motion.h3
                        className=" text-4xl mt-5 md:text-8xl lg:text-9xl font-[900] tracking-tighter uppercase text-center mx-auto"
                        style={{
                            mask: "radial-gradient(56% 83% at 50% 17.7%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0.4) 100%)",
                            y: yOffset,
                        }}
                    >
                        ROute-66
                    </motion.h3>
                    <div className="absolute inset-0 w-full h-full">
                        {blurLayers.map((layer, index) => (
                            <div
                                key={index}
                                className="absolute inset-0 pointer-events-none rounded-none"
                                style={{
                                    zIndex: layer.zIndex,
                                    WebkitBackdropFilter: `blur(${layer.blur})`,
                                    maskImage: layer.mask,
                                    WebkitMaskImage: layer.mask,
                                }}
                            ></div>
                        ))}
                    </div>
                </div>

            </div>
            <div className="relative max-w-5xl  items-center mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8">
                <div className="absolute top-0 w-full h-[0.85px] lg:h-[0.5px] bg-muted-foreground [mask:radial-gradient(50%_100%_at_50%_50%,hsl(var(--foreground))_-30%,transparent_100%)]" />
                <div className="lg:col-span-4">
                    <Link to="/" className="inline-flex items-center space-x-2">
                        <span className="text-foreground text-xl font-semibold">
                            Route66
                        </span>
                    </Link>
                    <p className="mt-4 text-sm text-gray-400 max-w-xs">
                        Built By Abinanthan B
                    </p>
                    <div className="flex space-x-4 mt-6">
                        {footerSocials.map((footerSocial, index) => (
                            <Link
                                to={footerSocial.href}
                                className="text-neutral-500 transition-all hover:text-foreground"
                                key={index}
                            >
                                <footerSocial.icon className="w-5 h-5" />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-2 lg:col-start-6">
                    <h3 className="text-foreground font-bold mb-4">Product</h3>
                    <ul className="space-y-3">
                        {footerLinks.product.map((footerLink, index) => (
                            <li
                                key={index}
                                className="w-max group transition-all duration-300 hover:translate-x-1"
                            >
                                <Link
                                    to={footerLink.href}
                                    className="w-full text-muted-foreground transition-all group-hover:text-foreground"
                                >
                                    {footerLink.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:col-span-3">
                    <h3 className="text-foreground font-bold mb-4">Company</h3>
                    <ul className="space-y-3">
                        {footerLinks.company.map((footerLink, index) => (
                            <li
                                key={index}
                                className="w-max group transition-all duration-300 hover:translate-x-1"
                            >
                                <Link
                                    to={footerLink.href}
                                    className="w-full text-muted-foreground transition-all group-hover:text-foreground"
                                >
                                    {footerLink.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:col-span-2">
                    <h3 className="text-foreground font-bold mb-4">Support</h3>
                    <ul className="space-y-3">
                        {footerLinks.support.map((footerLink, index) => (
                            <li
                                key={index}
                                className="w-max group transition-all duration-300 hover:translate-x-1"
                            >
                                <Link
                                    to={footerLink.href}
                                    className="w-full text-muted-foreground transition-all group-hover:text-foreground"
                                >
                                    {footerLink.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
