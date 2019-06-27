import React from "react";

const Page404 = () => {
  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col text-center">
          <img
            src="https://static.thenounproject.com/png/916720-200.png"
            alt="middle-finger"
            className="rounded mx-auto d-block"
          />
          <h2 className="pb-2">
            <span className="badge badge-success badge-lg">
              Sorry this site don't exist
            </span>
          </h2>
          <p>please check the address-line in your browser </p>
        </div>
      </div>
    </div>
  );
};

export default Page404;