'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Anchor, MessageCircle, ChevronDown } from 'lucide-react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOccasionsOpen, setIsOccasionsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleOccasions = () => {
        setIsOccasionsOpen(!isOccasionsOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsOccasionsOpen(false);
    };

    return (
        <header id="site-header" className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="header-wrap mx-auto max-w-7xl px-6 transition-all duration-300">
                <nav className="flex h-20 items-center justify-between" aria-label="Primary">
                    <Link href="/" className="inline-flex items-center gap-3" onClick={closeMenu}>
                        <Image src="/images/logo.png" alt="Yacht Club India" width={140} height={40} className="h-10 w-auto" priority />
                    </Link>

                    <ul className="hidden items-center gap-8 lg:flex">
                        <li><Link className="nav-link is-active" href="/">Home</Link></li>
                        <li><Link className="nav-link" href="/experiences">Experiences</Link></li>
                        <li><Link className="nav-link" href="/fleet">Fleet</Link></li>
                        <li className="relative group">
                            <button className="nav-link nav-trigger" aria-haspopup="true">
                                <span>Occasions</span>
                                <ChevronDown />
                            </button>
                            <div className="dropdown-panel absolute left-0 top-9 hidden min-w-52 rounded-xl border border-black/10 bg-white/95 p-2 group-hover:block group-focus-within:block">
                                <Link href="/occasions/proposals" className="dropdown-item">Proposals</Link>
                                <Link href="/occasions/birthdays" className="dropdown-item">Birthdays</Link>
                                <Link href="/occasions/weddings" className="dropdown-item">Weddings</Link>
                                <Link href="/occasions/corporate" className="dropdown-item">Corporate</Link>
                            </div>
                        </li>
                        <li><a className="nav-link" href="#about">About</a></li>
                        <li><a className="nav-link" href="#contact">Contact</a></li>
                    </ul>

                    <div className="hidden items-center gap-3 lg:flex">
                        <Link href="/booking" className="btn-gold btn-icon"><Anchor /><span>Book Now</span></Link>
                        <a href="#" className="btn-outline btn-icon"><MessageCircle /><span>Chat with us</span></a>
                    </div>

                    <div className="flex items-center gap-2 lg:hidden">
                        <Link href="/booking" className="mobile-quick-btn book" aria-label="Book Now">
                            <Anchor />
                            <span>Book Now</span>
                        </Link>
                        <button
                            id="menu-toggle"
                            className="inline-flex items-center rounded-lg border border-white/25 p-2 text-white"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label="Toggle menu"
                            onClick={toggleMenu}
                        >
                            <span className="text-lg">☰</span>
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div id="mobile-menu" className={`mobile-menu lg:hidden ${isMenuOpen ? 'is-open' : ''}`} hidden={!isMenuOpen}>
                    <div className="mobile-menu-panel rounded-2xl border border-black/10 bg-white/95 p-5">
                        <p className="mobile-menu-label">Navigation</p>
                        <Link className="mobile-link" href="/" onClick={closeMenu}>Home</Link>
                        <Link className="mobile-link" href="/experiences" onClick={closeMenu}>Experiences</Link>
                        <Link className="mobile-link" href="/fleet" onClick={closeMenu}>Fleet</Link>
                        <div className="mobile-dropdown">
                            <button
                                className="mobile-link mobile-drop-trigger"
                                type="button"
                                aria-expanded={isOccasionsOpen}
                                aria-controls="mobile-occ-list"
                                onClick={toggleOccasions}
                            >
                                <span>Occasions</span>
                                <ChevronDown />
                            </button>
                            <div id="mobile-occ-list" className="mobile-drop-list" hidden={!isOccasionsOpen}>
                                <Link href="/occasions/proposals" className="mobile-sub-link" onClick={closeMenu}>Proposals</Link>
                                <Link href="/occasions/birthdays" className="mobile-sub-link" onClick={closeMenu}>Birthdays</Link>
                                <Link href="/occasions/weddings" className="mobile-sub-link" onClick={closeMenu}>Weddings</Link>
                                <Link href="/occasions/corporate" className="mobile-sub-link" onClick={closeMenu}>Corporate</Link>
                            </div>
                        </div>
                        <a className="mobile-link" href="#about" onClick={closeMenu}>About</a>
                        <a className="mobile-link" href="#contact" onClick={closeMenu}>Contact</a>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <Link href="/booking" className="btn-gold btn-icon text-center" onClick={closeMenu}><Anchor /><span>Book Now</span></Link>
                            <a href="#" className="btn-outline btn-icon text-center"><MessageCircle /><span>Chat</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
