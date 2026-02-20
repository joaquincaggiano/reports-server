export interface OrderData {
  orderId: number;
  customerId: number;
  orderDate: Date;
  customers: Customers;
  orderDetails: OrderDetail[];
}

export interface Customers {
  customerId: number;
  customerName: string;
  contactName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderDetail {
  orderDetailId: number;
  orderId: number;
  productId: number;
  quantity: number;
  products: Products;
}

export interface Products {
  productId: number;
  productName: string;
  categoryId: number;
  unit: string;
  price: string;
}
