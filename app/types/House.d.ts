interface House {
  id: number;
  address: string;
  homeowner: string;
  photoURL: string;
  price: number;
}

interface HouseResponse {
  ok: boolean;
  houses: House[];
}
