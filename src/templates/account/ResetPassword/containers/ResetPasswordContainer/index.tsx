import React, {useEffect, useState} from "react";
import Layout from "../../../../../modules/Layout";
import ResetPasswordForm from "../../components/ResetPasswordForm";
import getUrlParameter from "../../../../../utils/getUrlParameter";
import { navigate } from "gatsby";

const ResetPasswordContainer = () => {
  const [encodedId, setEncodedId] = useState("");
  const [resetToken, setResetToken] = useState("");


  useEffect(() => {
    const token = getUrlParameter("token");
    if (typeof window !== "undefined") {
      if (!token) {
        navigate("/account/forgot")
      }
      if (token) {
        const [id, resetToken] = token.split("/");
        const encodedId = btoa(`gid://shopify/Customer/${id}`);
        setEncodedId(encodedId);
        setResetToken(resetToken)
      }
    }
  }, [])

  return (
    <Layout>
      <ResetPasswordForm id={encodedId} resetToken={resetToken} />
    </Layout>
  );
};

export default ResetPasswordContainer;
