export class Expense {

  id: number;
  description: string;
  amount: number;
  createdAt: Date;
  updateDate: Date;

  constructor(id?: number, description?: string, amount?: number, createAt?: Date, updateDate?: Date) {
    this.id = id || 0;
    this.description = description || '';
    this.amount = amount || 0;
    this.createdAt = createAt!;
    this.updateDate = updateDate!;
  }


}
