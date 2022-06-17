import { useEffect, useState } from "react";
import { getStatusFacebook, getPages } from "@utils/facebook";

export default function Pages() {
  const [userId, setUserId] = useState();
  const [pages, setPages] = useState();

  useEffect(() => {
    getStatusFacebook(setUserId);
    getPages(userId, setPages);
  }, []);

  return <>{console.log(pages)}</>;
}
