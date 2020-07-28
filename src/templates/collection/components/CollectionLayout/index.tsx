import React from "react";
import { Helmet } from "react-helmet";

import Layout from "../../../../modules/Layout";

interface Props {
  title: string;
  description: string;
  canonical: string;
  url: string;
  image: string;
  children: React.ReactNode;
}

const CollectionLayout = ({
  title,
  description,
  canonical,
  url,
  image,
  children,
}: Props) => {
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="en" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="Headlss" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@Statement" />
      </Helmet>
      {children}
    </Layout>
  );
};

export default CollectionLayout;
