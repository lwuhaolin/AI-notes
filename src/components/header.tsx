import Link from "next/link";
import Image from "next/image";
import { shadow } from "@/styles/utils";
import { Button } from "./ui/button";
import ModeToggle from "./DarkModeToggle";
import LayoutButton from "./LayoutButton";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "./ui/sidebar";
const Header = async () => {
  const user = await getUser();
  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{ boxShadow: shadow }}
    >
      <SidebarTrigger className="absolute top-1 left-1 cursor-pointer" />
      <Link href="/" className="flex items-end gap-2">
        <Image
          src="/window.svg"
          alt="Logo"
          width={60}
          height={60}
          className="rounded-full"
          priority
        />
        <h1 className="pd-1 flex flex-col text-2xl leading-6 font-semibold">
          GOAT <span>Notes</span>
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LayoutButton />
        ) : (
          <>
            <Button asChild>
              {/* 这里有问题，无法适应屏幕 */}
              <Link href="/sign-up" className="hidden sm:block">
                Sign Up
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
