export class Product {

  id: number;
  description: string;
  amount: number;
  quantity: number;
  availability: string;
  createdAt: Date;

  constructor(
    id?: number,
    description?: string,
    amount?: number,
    quantity?: number,
    availability?: string,
    createdAt?: Date
  ) {
    this.id = id || 0;
    this.description = description || '';
    this.amount = amount || 0;
    this.quantity = quantity || 0;
    this.availability = availability || '';
    this.createdAt = createdAt!;
  }

}
