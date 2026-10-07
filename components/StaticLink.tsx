import type { ComponentProps } from "react";

type StaticLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

export default function StaticLink({ href, ...props }: StaticLinkProps) {
  return <a href={href} {...props} />;
}
