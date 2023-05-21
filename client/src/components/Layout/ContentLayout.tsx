import * as React from "react";
import { Helmet } from "react-helmet-async";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <div>{children}</div>
    </>
  );
};

export default ContentLayout;
