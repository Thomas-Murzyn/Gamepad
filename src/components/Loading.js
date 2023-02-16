import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
  <>
    <h3 style={{ padding: "0px 50px", textAlign: "center" }}>
      Ceci est un site de démo dont le serveur est déployé sur un hébergeur de
      manière gratuite. Le service étant gratuit le serveur peut mettre un peu
      plus de temps à charger.
    </h3>
    <ReactLoading type={"bars"} color={color} height={70} width={100} />
    <h3 style={{ marginTop: "20px" }}>Powered by Rawg</h3>
  </>
);

export default Loading;
