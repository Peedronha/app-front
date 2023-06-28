export class FinancialSummary {
  id: number;
  totalExpenses: number;
  totalRevenue: number;
  updateDate: Date;

  constructor(id: number, totalExpenses: number, totalRevenue: number, updateDate: Date) {
    this.id = id;
    this.totalExpenses = totalExpenses;
    this.totalRevenue = totalRevenue;
    this.updateDate = updateDate;
  }

}
