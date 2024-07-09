import React from "react";

const ScrollPost = async ({ params }: { params: { scrollId: string } }) => {
  console.log(params.scrollId);

  return <div>ScrollPost</div>;
};

export default ScrollPost;
