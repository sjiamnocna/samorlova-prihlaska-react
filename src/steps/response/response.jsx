import React from "react";

const ShowResponse = ({ responseData }) => {
  console.log('showResponse:', responseData);
  return responseData.html ? (
    <div
      className={'response-body ' + responseData.type}
      dangerouslySetInnerHTML={{__html: responseData.html ?? null}}
      />
  ) : null;
};

export default ShowResponse;