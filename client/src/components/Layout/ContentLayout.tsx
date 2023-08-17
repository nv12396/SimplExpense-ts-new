import * as React from "react";
import { Helmet } from "react-helmet-async";

import { OverviewBox } from "../../features/dashboard/OverviewBox";

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
      <div className="hidden md:flex justify-center">
        <OverviewBox />
      </div>
      <div className="container mx-auto md:px-6">{children}</div>
    </>
  );
};

export default ContentLayout;
