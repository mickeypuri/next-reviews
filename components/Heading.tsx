import { orbitron } from "@/app/fonts";
import type { ReactNode } from 'react';

export interface HeadingProps {
  children: ReactNode;
}

export default function Heading({children}) {
  return (
    <h1 className="font-bold pb-3 text-2xl font-orbitron">
      {children}
    </h1>
  )
}
