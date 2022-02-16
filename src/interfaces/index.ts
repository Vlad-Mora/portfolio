export interface TravelAgencyUserProps {
  name: string;
  surname: string;
  email: string;
  password: string;
  balance: number;
  isAdmin: boolean;
}

export interface ItemProps {
  landmark: string;
  photo: string;
  rating: number;
  visited_on: string;
  favourite: boolean;
  price: number;
}

export interface UserCartProps {
  name: string;
  price: number;
}
