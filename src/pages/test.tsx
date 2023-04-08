import { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    fetch("api/test");
  }, []);

  return <></>;
}
