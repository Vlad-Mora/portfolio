import React from "react";

interface IErrorPageProps {
  statusCode?: number;
  errorTitle?: string;
  errorMessage?: string;
}

function Error({ statusCode, errorTitle, errorMessage }: IErrorPageProps) {
  return (
    <div>
      <h3>
        [{statusCode}]: {errorTitle}
      </h3>
      <p>{errorMessage}</p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  let statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
