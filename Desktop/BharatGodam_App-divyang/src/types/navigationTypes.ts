import {NavigationData} from '../screens/warehouseFarmer/SearchWarehouse';
import {
  FarmerBooking,
  Warehouse,
  WithdrawalDetails,
  addShipping,
  addShippingParams,
} from './entities';

// navigationTypes.ts
export type RootStackParamList = {
  Test: undefined;
  LoginAs: undefined;
  LoginMob: undefined;
  LoginOTP: undefined;
  LoginEmail: undefined;
  SignupMob: undefined;
  SignupEmail: undefined;
  FinishCreatingAccountPhone: undefined;
  FinishCreatingAccountEmail: undefined;
  SelectRole: undefined;
  SearchWarehouse: undefined;
  SearchResult: {
    warehouses: Warehouse[];
    addr?: string;
    Bookingdata?: NavigationData;
  };
  WarehouseDetails: {
    warehouse: Warehouse;
    Bookingdata?: NavigationData;
    simmilarWarehouses?: Warehouse[];
  };
  WarehouseDetailOwner: {
    warehouse?: Warehouse;
  };
  Filter: undefined;
  VerifyEmail: undefined;
  VerifyMob: undefined;
  ResetPassword: undefined;
  ResetOtp: undefined;
  ResetAndLogin: undefined;
  KycFarmer: undefined;
  KycOwner: undefined;
  Profile: undefined;
  Warehouse: undefined;
  BookWarehouse: {
    warehouse: Warehouse;
    Bookingdata: NavigationData;
    Totaldays: number;
    TotalCost: number;
  };
  WOBookWarehouse: {
    warehouse?: Partial<Warehouse>;
  };
  MyBooking: undefined;
  CancelBooking: {
    booking: FarmerBooking;
    warehouse?: Partial<Warehouse>;
  };
  AcceptedBookingDetails: {
    booking?: Partial<FarmerBooking>;
    warehouse?: Partial<Warehouse>;
  };
  RejectedBookingDetails: {
    booking?: Partial<FarmerBooking>;
  };
  'New deposit': undefined;
  WeightBridgeData: undefined;
  'Pending transactions': undefined;
  Grading: undefined;
  Bookings: {
    variant: string;
  };
  Dashboard: undefined;
  AddWarehouse: undefined;
  ViewDetails: {
    warehouse?: Warehouse;
  };
  Action: {
    data: string[];
  };
  Reasons: {};
  'Grading and expiry details': {};
  Withdrawal: {};
  WithdrawalData: {
    data?: string[];
    payload?: addShipping;
    params: addShippingParams;
  };

  'Add Manager': undefined;

  ListManager: {
    warehouse?: Warehouse;
  };

  'Transition history': undefined;
  'Weighbridge details': {
    variant: string;
  };
  'New weighbridge data': {};
  'Owner Dashboard': {};
  'Weight Verification': {};
  Commodities: undefined;
};
