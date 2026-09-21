import { createContext, useContext, useState } from "react";

const BranchContext = createContext(null);

export function BranchProvider({ children }) {
  const [branchId, setBranchId] = useState("BR-01");
  return (
    <BranchContext.Provider value={{ branchId, setBranchId }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranch must be used within a BranchProvider");
  return ctx;
}
