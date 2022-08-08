import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Navbar() {
  return (
    <div className="navbar">
      <Link href="/">
        <a>
          <Image src="/logo.webp" alt="logo" height={36} width={124} />
        </a>
      </Link>
    </div>
  );
}

export default Navbar;
