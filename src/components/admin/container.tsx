import { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return <div className="mt-5 bg-white p-5">{children}</div>;
}
