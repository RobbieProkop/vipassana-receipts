//ReceiptSLice
export interface ReceiptType {
  _id: string;
  user: string;
  receiptNumber: number;
  receipt_number?: number;
  place: string;
  full_name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  address: string;
  postalCode: string;
  type: string;
  number: number;
  words: string;
  signature: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  city: string;
  province: string;
  donor: string;
  country: string;
}
export interface CreateReceiptType {
  _id?: string;
  receiptNumber: number;
  place: string;
  full_name: string;
  email: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  type: string;
  number: number;
  words: string;
  signature: string;
}

export interface ReceiptState {
  receiptsArr: ReceiptType[] | [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

//////////////////////////
// Auth Slice
export interface UserType {
  _id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  token: string;
  message: string;
}

export interface AuthState {
  user: UserType | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

//////////////////////////
//token
export interface TokenState {
  token: string | null;
  receiptId: string;
  receiptData: ReceiptType;
}

//////////////////////////
// Reports
export interface ReportsProps {
  receipts: ReceiptType[];
  donor: string;
  setDonor: React.Dispatch<React.SetStateAction<string>>;
}
