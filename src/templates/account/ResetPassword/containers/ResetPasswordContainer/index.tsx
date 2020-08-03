import React, { useEffect, useState } from "react";
import Layout from "../../../../../modules/Layout";
import ResetPasswordForm from "../../components/ResetPasswordForm";
import getUrlParameter from "../../../../../utils/getUrlParameter";
import { navigate } from "gatsby";
import { linkResolver, Templates } from "../../../../../utils/linkResolver";

const ResetPasswordContainer = () => {
  const [encodedId, setEncodedId] = useState("");
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    const token = getUrlParameter("token");
    if (!token) {
      navigate(linkResolver(Templates.ACCOUNT_FORGOT_PASSWORD));
      return;
    }
    const [id, resetToken] = token.split("/");
    const encodedId = btoa(`gid://shopify/Customer/${id}`);
    setEncodedId(encodedId);
    setResetToken(resetToken);
  }, []);

  return (
    <Layout>
      <ResetPasswordForm id={encodedId} resetToken={resetToken} />
    </Layout>
  );
};

export default ResetPasswordContainer;
