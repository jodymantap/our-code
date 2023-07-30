import { useEffect } from "react";

const usePageTitle = (title: string): void => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default usePageTitle;
