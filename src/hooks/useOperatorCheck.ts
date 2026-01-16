"use client";

import { useState } from "react";

import type { Op } from "../types";
import { writeRecord } from "../utils/checkInStorage";

type OperatorCheckState = {
  codeByKey: Record<string, string>;
  errorByKey: Record<string, string>;
  handleCodeChange: (opId: number, operatorId: number, value: string) => void;
  handleCheckIn: (ops: Op[], opId: number, operatorId: number, code: string) => void;
  handleCheckOut: (ops: Op[], opId: number, operatorId: number, code: string) => void;
};

export function useOperatorCheck(): OperatorCheckState {
  const [codeByKey, setCodeByKey] = useState<Record<string, string>>({});
  const [errorByKey, setErrorByKey] = useState<Record<string, string>>({});

  const handleCodeChange = (
    opId: number,
    operatorId: number,
    value: string
  ) => {
    const key = `${opId}:${operatorId}`;
    setCodeByKey((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckIn = (
    ops: Op[],
    opId: number,
    operatorId: number,
    code: string
  ) => {
    if (!code) {
      setErrorByKey((prev) => ({
        ...prev,
        [`${opId}:${operatorId}`]: "Enter the check-in code.",
      }));
      return;
    }

    const op = ops.find((item) => item.opId === opId);
    if (!op || op.checkInCode !== code) {
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

  const handleCheckOut = (
    ops: Op[],
    opId: number,
    operatorId: number,
    code: string
  ) => {
    if (!code) {
      setErrorByKey((prev) => ({
        ...prev,
        [`${opId}:${operatorId}`]: "Enter the check-out code.",
      }));
      return;
    }

    const op = ops.find((item) => item.opId === opId);
    if (!op || op.checkOutCode !== code) {
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
