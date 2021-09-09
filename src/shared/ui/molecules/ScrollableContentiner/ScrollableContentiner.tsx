import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

const ScrollableContentiner = (props: Props) => {
  return <div className={props.className}>{props.children}</div>;
};

export default ScrollableContentiner;
