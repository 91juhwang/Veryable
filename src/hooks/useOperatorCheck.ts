"use client";

import { useCallback, useState } from "react";

import { writeRecord } from "../utils/checkInStorage";

type OperatorCheckState = {
  codeByKey: Record<string, string>;
  errorByKey: Record<string, string>;
  handleCodeChange: (operatorId: number, value: string) => void;
  handleCheckIn: (operatorId: number, code: string) => void;
  handleCheckOut: (operatorId: number, code: string) => void;
};

export function useOperatorCheck(
  opId: number,
  checkInCode: string,
  checkOutCode: string
): OperatorCheckState {
  const [codeByKey, setCodeByKey] = useState<Record<string, string>>({});
  const [errorByKey, setErrorByKey] = useState<Record<string, string>>({});

  const handleCodeChange = useCallback((operatorId: number, value: string) => {
    const key = `${opId}:${operatorId}`;
    setCodeByKey((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
  }, [opId]);

  const handleCheckIn = useCallback((operatorId: number, code: string) => {
    if (!code) {
      setErrorByKey((prev) => {
        const key = `${opId}:${operatorId}`;
        const nextError = "Enter the check-in code.";
        if (prev[key] === nextError) return prev;
        return {
          ...prev,
          [key]: nextError,
        };
      });
      return;
    }

    if (checkInCode !== code) {
      setErrorByKey((prev) => {
        const key = `${opId}:${operatorId}`;
        const nextError = "Invalid check-in code.";
        if (prev[key] === nextError) return prev;
        return {
          ...prev,
          [key]: nextError,
        };
      });
      return;
    }

    setErrorByKey((prev) => {
      const key = `${opId}:${operatorId}`;
      if (!prev[key]) return prev;
      return {
        ...prev,
        [key]: "",
      };
    });

    setCodeByKey((prev) => {
      const key = `${opId}:${operatorId}`;
      if (!prev[key]) return prev;
      return {
        ...prev,
        [key]: "",
      };
    });

    writeRecord(opId, operatorId, "checkIn", {
      code,
      timestamp: new Date().toISOString(),
    });
  },
    [checkInCode, opId]
  );

  const handleCheckOut = useCallback((operatorId: number, code: string) => {
    if (!code) {
      setErrorByKey((prev) => {
        const key = `${opId}:${operatorId}`;
        const nextError = "Enter the check-out code.";
        if (prev[key] === nextError) return prev;
        return {
          ...prev,
          [key]: nextError,
        };
      });
      return;
    }

    if (checkOutCode !== code) {
      setErrorByKey((prev) => {
        const key = `${opId}:${operatorId}`;
        const nextError = "Invalid check-out code.";
        if (prev[key] === nextError) return prev;
        return {
          ...prev,
          [key]: nextError,
        };
      });
      return;
    }

    setErrorByKey((prev) => {
      const key = `${opId}:${operatorId}`;
      if (!prev[key]) return prev;
      return {
        ...prev,
        [key]: "",
      };
    });

    setCodeByKey((prev) => {
      const key = `${opId}:${operatorId}`;
      if (!prev[key]) return prev;
      return {
        ...prev,
        [key]: "",
      };
    });

    writeRecord(opId, operatorId, "checkOut", {
      code,
      timestamp: new Date().toISOString(),
    });
  },
    [checkOutCode, opId]
  );

  return { codeByKey, errorByKey, handleCodeChange, handleCheckIn, handleCheckOut };
}
