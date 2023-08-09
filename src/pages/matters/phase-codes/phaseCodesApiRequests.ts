import { IExpenses } from "../expenses/expensesApiRequests";

export interface IPhaseCodes {
  id: string;
  name: string;
  description: string;
  code: string;
  expenses: IExpenses;
}
