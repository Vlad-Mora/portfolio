export interface UserProps {
  name: string;
  surname: string;
  email: string;
  password: string;
  balance: number;
  isadmin: boolean;
}

export interface TripItemProps {
  landmark: string;
  photo: string;
  rating: number;
  price: number;
  hidden: boolean;
  stock: number;
  viewscount: number;
  lastpurchased: string;
  discount: number;
}

export interface UserCartProps {
  name: string;
  price: number;
}

export interface LogProps {
  time: string;
  message: string;
}
