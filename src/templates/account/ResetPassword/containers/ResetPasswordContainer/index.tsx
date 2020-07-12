import React from "react";
import Layout from "../../../../../modules/Layout";
import ResetPasswordForm from "../../components/ResetPasswordForm";
import getUrlParameter from "../../../../../utils/getUrlParameter";
import { navigate } from "gatsby";

const ResetPasswordContainer = () => {
  const token = getUrlParameter("token");
  if (!token) return navigate("/account/forgot");
  const [id, resetToken] = token.split("/");
  const encodedId = btoa(`gid://shopify/Customer/${id}`);
  console.log(encodedId);
  return (
    <Layout>
      <ResetPasswordForm id={encodedId} resetToken={resetToken} />
    </Layout>
  );
};

export default ResetPasswordContainer;
