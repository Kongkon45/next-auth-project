"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    id: 1,
    slug: "/",
    route: "Home",
  },
  {
    id: 2,
    slug: "/about",
    route: "About",
  },
  {
    id: 2,
    slug: "/dashboard",
    route: "Dashboard",
  },
  {
    id: 3,
    slug: "/blog",
    route: "Blog",
  },
  {
    id: 4,
    slug: "/contact",
    route: "Contact",
  },
];

const Navbar = () => {
  const pathName = usePathname();
  const session = useSession();
  console.log(session);
  return (
    <div className="">
      <div className="bg-blue-500 flex justify-between items-center py-[10px] px-[100px]">
        <nav className="flex gap-20">
          {links?.map((link) => {
            return (
              <Link
                className={`${
                  pathName === link.slug
                    ? "text-black font-bold text-base"
                    : "text-white"
                }`}
                key={link.id}
                href={link.slug}
              >
                {link.route}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <div>
            {session?.status === "authenticated" ? (
              <>
                <div className="flex items-center gap-3 ">
                  <Image
                    src={session.data.user.image}
                    alt={session.data.user.name}
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div className="flex flex-col justify-center items-center">
                    <h3 className="text-base font-bold text-white">
                      {session.data.user.name}
                    </h3>
                    <p className="text-sm font-medium text-white">
                      {session.data.user.type}
                    </p>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div>
            {session?.status === "authenticated" ? (
              <button
                onClick={() => signOut()}
                className="bg-orange-500 text-white font-bold text-base py-2 px-4 rounded-[12px]"
              >
                LogOut
              </button>
            ) : (
              <>
                <button className="bg-orange-500 text-white font-bold text-base py-2 px-4 rounded-[12px]">
                <Link href="/api/auth/signin">Login</Link>
              </button>
              <button className="ml-4 bg-orange-500 text-white font-bold text-base py-2 px-4 rounded-[12px]">
                <Link href="/api/auth/signup">SingUp</Link>
              </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
