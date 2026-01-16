"use client";

import { useState } from "react";

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

  const handleCodeChange = (operatorId: number, value: string) => {
    const key = `${opId}:${operatorId}`;
    setCodeByKey((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckIn = (operatorId: number, code: string) => {
    if (!code) {
      setErrorByKey((prev) => ({
        ...prev,
        [`${opId}:${operatorId}`]: "Enter the check-in code.",
      }));
      return;
    }

    if (checkInCode !== code) {
      setErrorByKey((prev) => ({
        ...prev,
        [`${opId}:${operatorId}`]: "Invalid check-in code.",
      }));
      return;
    }

    setErrorByKey((prev) => ({
      ...prev,
      [`${opId}:${operatorId}`]: "",
    }));

    setCodeByKey((prev) => ({
      ...prev,
      [`${opId}:${operatorId}`]: "",
    }));

    writeRecord(
      opId,
      operatorId,
      "checkIn",
      {
        code,
        timestamp: new Date().toISOString(),
      }
    );
  };

  const handleCheckOut = (operatorId: number, code: string) => {
    if (!code) {
      setErrorByKey((prev) => ({
        ...prev,
        [`${opId}:${operatorId}`]: "Enter the check-out code.",
      }));
      return;
    }

    if (checkOutCode !== code) {
      setErrorByKey((prev) => ({
        ...prev,
        [`${opId}:${operatorId}`]: "Invalid check-out code.",
      }));
      return;
    }

    setErrorByKey((prev) => ({
      ...prev,
      [`${opId}:${operatorId}`]: "",
    }));

    setCodeByKey((prev) => ({
      ...prev,
      [`${opId}:${operatorId}`]: "",
    }));

    writeRecord(
      opId,
      operatorId,
      "checkOut",
      {
        code,
        timestamp: new Date().toISOString(),
      }
    );
  };

  return { codeByKey, errorByKey, handleCodeChange, handleCheckIn, handleCheckOut };
}
