import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function Page({
  children,
  title,
  description,
  className,
}: Props) {
  const content = !className ? (
    children
  ) : (
    <div className={className}>{children}</div>
  );

  return (
    <>
      <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
      </Helmet>
      {content}
    </>
  );
}
