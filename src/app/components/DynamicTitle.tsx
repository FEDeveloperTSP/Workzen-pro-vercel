"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

const DynamicTitle = () => {
  const companyName = useSelector((state: any) => state?.auth?.user?.company_name);  

  useEffect(() => {
    if (companyName) {
      document.title = `Workzen Pro | ${companyName}`;
    } else {
      document.title = "Workzen Pro";
    }
  }, [companyName]);

  return null;
};

export default DynamicTitle;
