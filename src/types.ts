export type Operator = {
  id: number;
  firstName: string;
  lastName: string;
  opsCompleted: number;
  reliability: number;
  endorsements: string[];
};

export type Op = {
  opId: number;
  opTitle: string;
  publicId: string;
  opDate: string;
  filledQuantity: number;
  operatorsNeeded: number;
  startTime: string;
  endTime: string;
  estTotalHours: number;
  checkInCode: string;
  checkOutCode: string;
  checkInExpirationTime: string;
  checkOutExpirationTime: string;
  operators: Operator[];
};
