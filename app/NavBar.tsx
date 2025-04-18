'use client';

import classnames from "classnames";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {

    const currentPath = usePathname()

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Bugs', href: '/bugs' }
    ];

    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/">
                <AiFillBug></AiFillBug>
            </Link>
            <ul className="flex space-x-6">
                {links.map(link =>
                    <li key={link.href}>
                        <Link

                            className={classnames({
                                'text-zinc-900': link.href === currentPath,
                                'text-zinc-500': link.href !== currentPath,
                                'hover:text-zinc-800 transition-colors': true
                            })}
                            href={link.href}>
                            {link.label}
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default NavBar
