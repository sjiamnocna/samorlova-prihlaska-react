import React from "react";

const ShowResponse = ({ responseData }) => {
  return (
    <div
      className={'response-body ' + responseData.type}
      dangerouslySetInnerHTML={{__html: responseData.html ?? null}}
      />
  );
};

export default ShowResponse;