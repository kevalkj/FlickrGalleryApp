import {BASE_URL} from '@env';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {
  ICreateBooking,
  IUpdateUserRequest,
  User,
  Bookings,
  Warehouse,
  WeighbridgeDetails,
  FarmerBooking,
  WithdrawalDetails,
  addShipping,
  addShippingParams,
  GradingDetails,
  addDeposit,
  AddCommodity,
  Manager,
} from '../types/entities';
import {getToken} from '../utils/auth';
import Toast from 'react-native-toast-message';

// an Axios instance

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.defaults.baseURL = BASE_URL;
api.defaults.headers.common['Content-Type'] = 'application/json';

api.interceptors.request.use(async config => {
  const token = await getToken();
  //console.log(token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interface for the response
interface ApiResponse {
  data: any;
  status: number;
}
interface ApiRes<T> {
  data: T;
  status: number;
  message: string;
}

interface ErrorResponse {
  error: string;
}

// Authentication API
const authApi = {
  signupByPhone: (phone: string): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/signup/phone';
    return api.post<ApiResponse>(url, {
      phone: '91' + phone,
    });
  },

  LOGIN_WITH_PHONE: (phone: string): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/login/phone';
    return api.post<ApiResponse>(url, {
      phone: '91' + phone,
    });
  },

  signupByEmail: (email: string): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/signup/email';
    return api.post<ApiResponse>(url, {
      email: email,
    });
  },

  LOGIN_WITH_EMAIL: (
    email: string,
    password: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/login/email';
    return api.post<ApiResponse>(url, {
      email: email,
      password: password,
    });
  },

  verifyOtpForPhone: (
    otp: string,
    token: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/verify-otp/phone';
    const config: AxiosRequestConfig = {
      headers: {Authorization: `Bearer ${token}`},
    };
    return api.post<ApiResponse>(
      url,
      {
        otp: otp,
      },
      config,
    );
  },

  VERIFY_OTP_LOGIN_PHONE: (
    otp: string,
    token: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/login/verify-otp';
    const config: AxiosRequestConfig = {
      headers: {Authorization: `Bearer ${token}`},
    };
    return api.post<ApiResponse>(
      url,
      {
        otp: otp,
      },
      config,
    );
  },

  verifyOtpByEmail: (
    otp: string,
    token: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/verify-otp/email';
    const config: AxiosRequestConfig = {
      headers: {Authorization: `Bearer ${token}`},
    };
    return api.post<ApiResponse>(
      url,
      {
        otp: otp,
      },
      config,
    );
  },

  CREATE_ACCOUNT_WITH_PHONE: (
    firstName: string,
    lastName: string,
    role: string,
    token: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/create/phone';
    const config: AxiosRequestConfig = {
      headers: {Authorization: `Bearer ${token}`},
    };
    return api.post<ApiResponse>(
      url,
      {
        firstName: firstName,
        lastName: lastName,
        role: role,
      },
      config,
    );
  },

  CREATE_FARMER_WITH_PHONE: (
    firstName: string,
    lastName: string,
    token: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/createFarmer';
    const config: AxiosRequestConfig = {
      headers: {Authorization: `Bearer ${token}`},
    };
    return api.post<ApiResponse>(
      url,
      {
        firstName: firstName,
        lastName: lastName,
      },
      config,
    );
  },

  SIGNUP_FARMER_PHONE: (
    role: string,
    token: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/signupFarmer';
    const config: AxiosRequestConfig = {
      headers: {Authorization: `Bearer ${token}`},
    };
    return api.post<ApiResponse>(
      url,
      {
        role: role,
      },
      config,
    );
  },

  CREATE_ACCOUNT_WITH_EMAIL: (
    firstName: string,
    lastName: string,
    role: string,
    password: string,
    token: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/create/email';
    const config: AxiosRequestConfig = {
      headers: {Authorization: `Bearer ${token}`},
    };
    return api.post<ApiResponse>(
      url,
      {
        firstName: firstName,
        lastName: lastName,
        role: role,
        password: password,
      },
      config,
    );
  },

  SIGNUP_WITH_FARMER_WITH_EMAIL: (
    firstName: string,
    lastName: string,
    password: string,
    token: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/createFarmer/email';
    const config: AxiosRequestConfig = {
      headers: {Authorization: `Bearer ${token}`},
    };
    return api.post<ApiResponse>(
      url,
      {
        firstName: firstName,
        lastName: lastName,
        password: password,
      },
      config,
    );
  },

  CREATE_FARMER_WITHROLE_EMAIL: (
    role: string,
    token: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/signupFarmer/email';
    const config: AxiosRequestConfig = {
      headers: {Authorization: `Bearer ${token}`},
    };
    return api.post<ApiResponse>(
      url,
      {
        role: role,
      },
      config,
    );
  },

  RESET_PASSWORD: (email: string): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/resetpassword';
    return api.post<ApiResponse>(url, {
      email: email,
    });
  },

  VERIFY_OTP_PASSWORD: (
    otp: string,
    token: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/verifyResetPassword';
    const config: AxiosRequestConfig = {
      headers: {Authorization: `Bearer ${token}`},
    };
    return api.post<ApiResponse>(
      url,
      {
        otp: otp,
      },
      config,
    );
  },

  UPDATE_PASSWORD: (
    email: string,
    password: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/auth/updatePassword';
    return api.post<ApiResponse>(url, {
      email: email,
      newPassword: password,
    });
  },

  updateUser: async (userData: IUpdateUserRequest): Promise<User> => {
    const url = '/api/auth/update';
    try {
      const response = await api.put<ApiRes<User>>(url, userData);
      return response.data.data;
    } catch (err) {
      console.log('Error in useUser : ', err);
      throw new Error('Error fetching user info');
    }
  },

  getUser: async (user_id: string): Promise<User> => {
    try {
      const url = `api/auth/fetch/${user_id}`;
      const response = await api.get<ApiRes<User>>(url);
      console.log(1);
      return response.data.data;
    } catch (error) {
      console.log(error.response.data);
      throw error;
    }
  },
  getUserProfile: async (): Promise<User> => {
    try {
      const url = 'api/auth/fetchUserInfo';
      const response = await api.get<ApiRes<User>>(url);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};

// Warehouse API
const warehouseApi = {
  addWarehouse: async (data: any): Promise<AxiosResponse<ApiResponse>> => {
    console.log('data in add warehouse : ', data);

    const url = '/api/warehouse';
    return api.post<ApiResponse>(url, data);
  },

  addWarehouseManager: async (
    data: any,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = '/api/warehouse/add-manager';
    return api.put<ApiResponse>(url, data);
  },

  assignWarehouseManager: async (
    warehouseId: string,
    managerId: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = `/api/warehouse/${warehouseId}/assign-manager/${managerId}`;
    return api.put<ApiResponse>(url);
  },

  getWarehouseManager: async (id: string | undefined): Promise<Manager> => {
    const url = `/api/warehouse/manager/${id}`;
    try {
      const res = api.get<ApiRes<Manager>>(url);
      return (await res).data.data;
    } catch (error) {
      throw error;
    }
  },

  getWarehouseManagerbyOwner: async (): Promise<Manager[]> => {
    const url = '/api/warehouse/managers/owner-all-managers';
    try {
      const res = api.get<ApiRes<Manager[]>>(url);
      return (await res).data.data;
    } catch (error) {
      throw error;
    }
  },

  getAllWarehouses: async (): Promise<Warehouse[] | null> => {
    const url = '/api/warehouse';
    try {
      const response: AxiosResponse<ApiRes<Warehouse[]>> = await api.get<
        ApiRes<Warehouse[]>
      >(url);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all warehouses:', error);
      return null; // or handle error as needed
    }
  },

  getWarehouseById: async (id: string): Promise<Warehouse | null> => {
    const url = `/api/warehouse/${id}`;
    try {
      const response: AxiosResponse<ApiRes<Warehouse>> = await api.get<
        ApiRes<Warehouse>
      >(url);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error fetching  warehouses:',
          error?.response?.data.error,
        );
      } else {
        console.log(error);
      }
      return null;
    }
  },

  getAllWarehousesForOwner: async (): Promise<Warehouse[] | null> => {
    const url = '/api/warehouse/owner';
    try {
      const response: AxiosResponse<ApiRes<Warehouse[]>> = await api.get<
        ApiRes<Warehouse[]>
      >(url);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all warehouses:', error);
      return null;
    }
  },

  getAllWarehousesForManager: async (): Promise<Warehouse[] | null> => {
    const url = '/api/warehouse/manager-wh';
    try {
      const response: AxiosResponse<ApiRes<Warehouse[]>> = await api.get<
        ApiRes<Warehouse[]>
      >(url);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching all warehouses:', error);
      return null;
    }
  },

  getWarehouseByLatLong: async (
    lat: number,
    long: number,
  ): Promise<Warehouse[] | null> => {
    const url = '/api/warehouse/fetchWarehouseBylatlongkm';
    try {
      const response: AxiosResponse<ApiRes<Warehouse[]>> = await api.get<
        ApiRes<Warehouse[]>
      >(url, {params: {lat, long}});
      return response.data.data;
    } catch (error) {
      console.error(
        `Error fetching warehouse at lat: ${lat}, long: ${long}`,
        error,
      );
      return null; // or handle error as needed
    }
  },

  searchWarehouses: async (params: {
    locality_area?: string;
    landmark?: string;
    pincode?: string;
    city?: string;
    State?: string;
    mobile_number?: string;
    bags?: number;
    weight?: string;
    commodity_name?: string;
  }): Promise<Warehouse[] | null> => {
    const url = '/api/warehouse/search';
    const searchParams = new URLSearchParams(params as any).toString();
    console.log(`${url}?${searchParams}`);

    try {
      const response: AxiosResponse<ApiRes<Warehouse[]>> = await api.get<
        ApiRes<Warehouse[]>
      >(`${url}?${searchParams}`);
      return response.data.data;
    } catch (error) {
      console.error('Error searching warehouses:', error);
      return null;
    }
  },
  updateItemsInWarehouse: async (
    data: AddCommodity,
    id: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    console.log('data in add commodity api :', data);

    try {
      const url = `/api/warehouse/commodity/${id}`;
      console.log(url);
      const response = await api.put<ApiResponse>(url, data);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  FETCH_ALL_WAREHOUSES_BY_WAREHOUSE_OWNER_ID: (
    id: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = `/api/warehouse/owner/${id}`;
    return api.get<ApiResponse>(url);
  },
};

// Shipping API
const shippingApi = {
  addShipping: (
    warehouseId: string,
    bookingId: string,
    data: any,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = `/api/shipping/${warehouseId}/${bookingId}`;
    return api.post<ApiResponse>(url, data);
  },

  getShippingById: (id: string): Promise<AxiosResponse<ApiResponse>> => {
    const url = `/api/shipping/shipping/${id}`;
    return api.get<ApiResponse>(url);
  },

  getWithdrawlId: (id: string): Promise<AxiosResponse<ApiResponse>> => {
    const url = `/api/shipping/${id}/withdrawlId`;
    return api.get<ApiResponse>(url);
  },

  updateShipping: (
    id: string,
    data: any,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = `/api/shipping/update/${id}`;
    return api.put<ApiResponse>(url, data);
  },

  getShippingDetailsByWithdrawlId: (
    withdrawlId: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = `/api/shipping/${withdrawlId}`;
    return api.get<ApiResponse>(url);
  },
};

const GradeAndDeposit = {
  addDeposit: async (payload: addDeposit) => {
    console.log('add deposit', payload);
    try {
      const url = '/api/deposit/add';
      const response = await api.post<ApiResponse>(url, payload);
      console.log(response.data, 'hoohoo');
    } catch (error: any) {
      console.log(error.response.data);

      throw error;
    }
  },
  get_deposit_by_status: (
    status: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = `/api/deposit/status/${status}`;
    return api.get<ApiResponse>(url);
  },
  get_deposit_by_deposit_Id: async (
    id: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = `/api/deposit/${id}`;
    return api.get<ApiResponse>(url);
  },
  add_grade: async (
    id: string,
    assignerName: string,
    gradeDate: string,
    foreignMatter: number,
    otherFoodGrain: number,
    other: number,
    damagedGrain: number,
    immatureGrain: number,
    weevilledGrain: number,
    grade: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    try {
      const url = `/api/grade/add/${id}`;
      const response = await api.put<ApiResponse>(url, {
        assignerName: assignerName,
        gradeDate: gradeDate,
        // "images": [

        // ],
        foreignMatter: foreignMatter,
        otherFoodGrain: otherFoodGrain,
        other: other,
        damagedGrain: damagedGrain,
        immatureGrain: immatureGrain,
        weevilledGrain: weevilledGrain,
        grade: grade,
      });
      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      throw error;
    }
  },
  get_deposit: async (): Promise<addDeposit[]> => {
    try {
      const url = '/api/deposit/';
      const response = await api.get<ApiResponse>(url);
      console.log(response.data.data, 100);
      return response.data.data;
    } catch (error) {
      console.log(11);
      throw error;
    }
  },
  get_grading: async (): Promise<GradingDetails[]> => {
    try {
      const url = '/api/grade/fetch-all';
      const response = await api.get<ApiResponse>(url);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  get_deposit_farmer: async (): Promise<addDeposit[]> => {
    try {
      const url = '/api/deposit/farmer';
      const response = await api.get<ApiResponse>(url);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};
const Booking = {
  get_all_bookings: async (): Promise<FarmerBooking[]> => {
    console.log(1);

    try {
      const url = '/api/booking/owner-warehouses/all-bookings';
      const response = await api.get<ApiRes<FarmerBooking[]>>(url);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  get_all_bookings_farmer: async (): Promise<FarmerBooking[]> => {
    try {
      const url = '/api/booking';

      const response = await api.get<ApiRes<FarmerBooking[]>>(url);
      console.log(response.data.data.length);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  get_bookings_by_booking_id: async (id: string): Promise<FarmerBooking[]> => {
    try {
      const url = `api/booking/booking/${id}`;
      const response = await api.get<ApiRes<FarmerBooking[]>>(url);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  accept_booking: async (id: string) => {
    const token = await getToken();
    try {
      const url = `api/booking/${id}/accept`;
      const response = await api.put<ApiResponse>(url, {
        acceptedBy: token,
      });
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.message);
        console.error('Response data: ', error.response?.data);
        console.error('Status: ', error.response?.status);
        Toast.show({
          type: 'error',
          text1: 'An error occured !',
          text2: error.response?.data?.error,
        });
      } else {
        console.error('Unknown error: ', error);
        Toast.show({
          type: 'error',
          text1: 'An error occured !',
          //text2:error.response?.data?.error
        });
      }
      throw error;
    }
  },
  reject_booking: async (id: string, reason: string) => {
    const token = await getToken();
    try {
      const url = `api/booking/${id}/reject`;

      const response = api.put<ApiResponse>(url, {
        rejectedBy: token,
        reasonOfRejected: reason,
      });
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.message);
        console.error('Response data: ', error.response?.data);
        console.error('Status: ', error.response?.status);
        Toast.show({
          type: 'error',
          text1: 'An error occured !',
          text2: error.response?.data?.error,
        });
      } else {
        console.error('Unknown error: ', error);
        Toast.show({
          type: 'error',
          text1: 'An error occured !',
          //text2:error.response?.data?.error
        });
      }
      // console.log(error, 1);
      throw error;
    }
  },

  cancel_booking: async (
    id: string,
    reason: string,
  ): Promise<AxiosResponse<ApiResponse>> => {
    const url = `/api/booking/cancel/${id}`;
    try {
      const res = await api.post<ApiResponse>(url, {
        reason: reason,
      });
      return res.data.data;
    } catch (err) {
      throw err;
    }
  },
  create_booking: async (
    id: string,
    data: ICreateBooking,
  ): Promise<AxiosResponse<ApiResponse>> => {
    console.log(data.bagSize);

    const url = `/api/booking/farmer/${id}`;
    console.log(data);
    try {
      const res = await api.post<ApiResponse>(url, data);
      return res.data.data;
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Oops',
        text2: (err as AxiosError<ErrorResponse>).response?.data?.error,
      });
      throw err;
    }
  },
};

const Weighbridge = {
  get_all_details: async (): Promise<WeighbridgeDetails[]> => {
    try {
      const url = 'api/weighbridge';
      const response = await api.get<ApiResponse>(url);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  add_details: async (
    booking_id: string,
    gross_weight: string,
    gross_weight_unit: string,
    tore_weight: string,
    tore_weight_unit: string,
    time: string,
    truck_number?: string,
    driver_name?: string,
  ) => {
    console.log(
      'Data in add weighbridge :',
      booking_id,
      gross_weight,
      gross_weight_unit,
      tore_weight,
      tore_weight_unit,
      time,
    );
    const today = new Date().toISOString().substring(0, 10).replaceAll('-', '');
    console.log(today);

    try {
      const url = 'api/weighbridge/add';

      const response = await api.post<ApiResponse>(url, {
        booking_id: booking_id,
        today_date: today,
        time: time,
        gross_weight: gross_weight,
        gross_weight_unit: gross_weight_unit,
        tore_weight: tore_weight,
        tore_weight_unit: tore_weight_unit,
        truck_number: 'MH 47A\n2345',
        driver_name: 'Arjun',
      });
      console.log(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.message);
        console.error('Response data: ', error.response?.data);
        console.error('Status: ', error.response?.status);
        Toast.show({
          type: 'error',
          text1: 'An error occured !',
          text2: error.response?.data?.error,
          visibilityTime: 4000,
        });
      } else {
        console.error('Unknown error: ', error);
        Toast.show({
          type: 'error',
          text1: 'An error occured !',
          //text2:error.response?.data?.error
        });
      }
      console.log(error, 1);
      throw error;
    }
  },
};

const Withdrawalapi = {
  get_all_withdrawal: async (): Promise<WithdrawalDetails[]> => {
    try {
      const url = 'api/shipping/getWithdrawl';
      const response = await api.get<ApiResponse>(url);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  add_shipping: async (payload: addShipping, params: addShippingParams) => {
    console.log('Withdrawal payload : ', payload);

    try {
      const url = `api/shipping/${params.warehouse_id}/${params.booking_id}`;
      console.log(url);
      const response = await api.post<ApiResponse>(url, payload);
      console.log(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Axios error: ', error.message);
        console.error('Response data: ', error.response?.data);
        console.error('Status: ', error.response?.status);
        Toast.show({
          type: 'error',
          text1: 'An error occured !',
          text2: error.response?.data?.error,
          visibilityTime: 4000,
        });
      } else {
        console.error('Unknown error: ', error);
        Toast.show({
          type: 'error',
          text1: 'An error occured !',
          //text2:error.response?.data?.error
        });
      }
      console.log(error, 1);
      throw error;
    }
  },
  sendOTP: async (phone: string) => {
    try {
      const url = 'api/shipping/send-otp';
      console.log(url, phone, 11);
      const response = await api.post<ApiResponse>(url, {phone: phone});
    } catch (error) {
      console.log(error, 1);
      throw error;
    }
  },
  verifyOTP: async (otp: string, phone: string) => {
    try {
      const url = 'api/shipping/verify-otp';
      console.log(url);
      const response = await api.post<ApiResponse>(url, {
        phone: phone,
        otp: otp,
      });
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error, 1);
      throw error;
    }
  },
};
const DashboardData = async (timeLine: string) => {
  const base = 'api/booking/';
  const filter = `?filter=${timeLine}`;
  try {
    const url1 = base + 'current-booking/count' + filter;
    const url2 = base + 'total-booking/count' + filter;
    const url3 = base + 'totalGoods-count' + filter;
    const url4 = base + 'pending-count' + filter;
    const url5 = base + 'accepted-count' + filter;
    const url6 = base + 'rejected-count' + filter;
    const response1 = await api.get<ApiResponse>(url1);
    const response2 = await api.get<ApiResponse>(url2);
    const response3 = await api.get<ApiResponse>(url3);
    const response4 = await api.get<ApiResponse>(url4);
    const response5 = await api.get<ApiResponse>(url5);
    const response6 = await api.get<ApiResponse>(url6);
    return [
      response1.data.data,
      response2.data.data,
      response3.data.data + ' MT',
      response4.data.data,
      response5.data.data,
      response6.data.data,
    ];
  } catch (error) {
    throw error;
  }
};
const DashboardGraph = async (timeLine: string) => {
  try {
    const url = `current-booking/count?filter=${timeLine}`;
    const response = await api.get<ApiResponse>(url);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export {
  authApi,
  warehouseApi,
  shippingApi,
  Booking,
  GradeAndDeposit,
  Weighbridge,
  Withdrawalapi,
  DashboardData,
  DashboardGraph,
};
