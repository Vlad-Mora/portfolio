import React from "react";
import { Button } from "semantic-ui-react";

const TestPage = () => {
  function pageCount(n: number, p: number) {
    if (n === 2) {
      return 0;
    } else if (n % 2 === 0 && n - p === 1) {
      return 1;
    } else {
      return Math.min(p / 2, (n - p) / 2);
    }
  }

  return (
    <div className="content">
      <Button onClick={() => pageCount(5, 3)} />
    </div>
  );
};

export default TestPage;
