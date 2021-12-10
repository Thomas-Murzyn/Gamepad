import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
  <>
    <ReactLoading type={"bars"} color={color} height={70} width={100} />
    <h3 style={{ marginTop: "20px" }}>Powered by Rawg</h3>
  </>
);

export default Loading;
