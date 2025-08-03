"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

interface LinkNProgressProps extends React.ComponentProps<typeof Link> {
  href: string;
}
export default function LinkNProgress({
  href,
  children,
  ...props
}: LinkNProgressProps) {
  const pathname = usePathname();

  const handleClick = () => {
    const lastPathname = pathname;
    if (href !== pathname) {
      NProgress.start();
      setTimeout(() => {
        if (lastPathname === pathname) {
          NProgress.done();
        }
      }, 1000);
    }
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
