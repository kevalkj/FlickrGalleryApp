// types.tsx
export interface MongoDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface price_perday {
  "_id": string,
  "price": number,
  "weight": string
}

// Define type for Commodity
export interface Commodity {
  name: string;
  bags: string;
  weight: string;
  AddedBy: string;
  price_perday: price_perday[];
  _id: string;
}
interface Address {
  street: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  buildingName: string;
}
// Define type for User
export interface User extends MongoDocument {
  Address: Address;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  isDocumentsVerified: boolean;
  isAddressVerified: boolean;
  isKycDone: boolean;
  lastLoginTime: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  isActive: boolean;
  isArchived: boolean;
  isVerified: boolean;
  isRejected: boolean;
  profilePicture: string;
  phone: string;
}

// Define type for Manager
export interface Manager extends MongoDocument {
  name: string;
  email: string;
  password: string;
  role: string;
  isDocumentsVerified: boolean;
  isAddressVerified: boolean;
  isKycDone: boolean;
  lastLoginTime: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  isActive: boolean;
  isArchived: boolean;
  isVerified: boolean;
  isRejected: boolean;
  warehouse: string[];
}

// Define type for Warehouse
export interface Warehouse extends MongoDocument {
  User: User | string;
  warehouse_name: string;
  warehouse_id: string;
  locality_area: string;
  landmark: string;
  pincode: string;
  city: string;
  State: string;
  mobile_number: string;
  total_capacity: number;
  filled_capacity: number;
  remainingCapacity: number;
  wdra_certificate: string[]; // Assuming it's an array of strings
  wdra_certified: boolean;
  Facilities: string[]; // Assuming it's an array of strings
  main_photo: string[];
  other_photo: string[];
  isActive: boolean;
  isArchived: boolean;
  Commodity: Commodity[];
  manager: Manager | string;
}

// Define type for Bookings
export interface Bookings {
  status: string;
  warehouse: Partial<Warehouse>;
  isAccepted: boolean;
  isRejected: boolean;
  productname: string;
  fromDate: string;
  toDate: string;
  totalWeight: string;
  total: string;
  name: string;
  _id: string;
}

export interface WeighbridgeDetails {
  booking_id: {
    isItemInWarehouse: boolean;
    name: string;
    fromDate: string;
    fromTime: string;
    totalWeight: string;
    productname: string;
  };
  _id: string;
  gross_weight: string;
  tore_weight: string;
  truck_number?: string;
  driver_name?: string;
}


export interface IUpdateUserRequest {
  firstName: string;
  lastName: string;
  Address: Address;
  phone: string;
  email: string;
}

export interface ICreateBooking {
  fromDate: string,
  toDate: string,
  commodity: string,
  weight: string,
  unit: string,
  noOfBags: string,
  bagSize: string,
  total_price?:number
  requestcapacity?: string
}

interface ShippingDetails {
  _id: string;
}

export interface FarmerBooking extends MongoDocument {
  user: string;
  warehouse: Partial<Warehouse>;
  Mobile_no: string;
  name: string;
  productname: string;
  requestcapacity: string;
  reason_of_rejected: string;
  total_price: number;
  totalWeight: number;
  distance: number;
  distancePrice: number;
  distanceTotal: number;
  status: string;
  isAccepted: boolean;
  acceptedBy: string;
  isRejected: boolean;
  rejectedBy: string;
  shippingDetails: ShippingDetails[];
  fromDate: number;
  fromTime: number;
  fromTimestamp: number;
  isItemInWarehouse: boolean;
  isItemOutForTransport: boolean;
  items: any[];
  toDate: number;
  toTime: number;
  toTimestamp: number;
  isBookingWithdrawn: boolean;
  Commodity: any[];
  isBookingDeposited: boolean;
  isBookingGraded: boolean;
  isBookingWeighbridgeAdded: boolean;
}

export interface AddCommodity {
  name: string,
  weight: string,
  price_perday: number,
  isActive: boolean,
  isArchived: boolean
}



export interface WithdrawalDetails {
  User:string;
  commodity: {itemName: string; quantity: string}[];
  warehouse: {_id: string; warehouse_name: string};
  noOfBags: string;
  totalBags: string;
  truckNumber: string;
  driverName: string;
  bookingId: {
    _id: string;
    fromDate: string;
    toDate: string;
    noOfBags: string;
    bagSize: string;
  };
}

export interface addShipping {
  driverName: string;
  truckNumber: string;
  commodity: {itemName: string; quantity: string}[];
  totalBags: string;
}

export interface addShippingParams {
  warehouse_id: string;
  booking_id: string;
}

export interface GradingDetails {
  _id:string;
          commodityName:string;
          depositDate:string;
          slotNumber:string;
          revalidationDate:string;
          expiraryDate:string;
          foreignMatter:string;
          otherFoodGrain:string;
          other:string;
          damagedGrain:string;
          immatureGrain:string;
          weevilledGrain:string;
          grade:string;
          warehouseName:string,
          totalAmt:string,
          totalWeight:string
}

export interface addDeposit{
  bookingId: string,
    depositDate: string,
    slotNumber: string,
    revalidationDate?: string,
    expiraryDate: string,
    commodityType: string,
}

