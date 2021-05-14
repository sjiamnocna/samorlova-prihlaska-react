import React from "react";
import RecievedData from "./completed.response";
import ErrorResponse from "./error.response";

const ShowResponse = ({ responseData }) => {
  return responseData.type === 'ok' ? (
    <RecievedData responseData={responseData} />
  ) : (
    <ErrorResponse responseData={responseData} />
  );
};

export default ShowResponse;