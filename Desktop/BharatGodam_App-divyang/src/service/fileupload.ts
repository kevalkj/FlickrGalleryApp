import axios, {AxiosInstance} from 'axios';
import {BASE_URL} from '@env';
import {getToken} from '../utils/auth';
import Toast from 'react-native-toast-message';

export interface FileType {
  uri: string;
  type: string;
  name: string;
  height?: number;
  width?: number;
}
const token = getToken();

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
api.interceptors.request.use(async config => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const UploadKycFiles = async (files: {
  [key: string]: FileType | null;
}) => {
  if (!token) {
    return null;
  }
  const formData = new FormData();
  // Append each file with the corresponding key
  const fields = ['aadharcard', 'pancard'];

  Object.keys(files).forEach(key => {
    console.log(fields[key]);
    const file = files[key];
    if (file) {
      formData.append(fields[key], {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
    }
  });

  try {
    const response = await api.post('/api/auth/upload/kyc', formData);
    console.log('Upload Success', response.data);
  } catch (error) {
    console.error('Upload Error', error);
    Toast.show({
      type: 'error',
      text1: 'Oops!',
      text2: 'An error occurred while uploading the files',
    });
  }
};

export const UploadMultipleFiles = async (
  id: string,
  files: {[key: string]: FileType[] | null},
) => {
  if (!token) {
    return null;
  }
  console.log('Multiple files', files);

  const formData = new FormData();
  const fields = ['main_photo', 'other_photo'];

  fields.forEach(field => {
    const fileArray = files[field];
    if (fileArray) {
      fileArray.forEach(file => {
        formData.append(field, {
          uri: file.uri,
          type: file.type,
          name: file.name,
          height: file.height,
          width: file.width,
        });
      });
    }
  });
  console.log(formData);
  try {
    const response = await api.post(`/api/upload/${id}`, formData);
    console.log('Upload Success', response.data.data);
    Toast.show({
      text1: 'success!',
      text2: 'File uploaded successfully',
    });
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Oops!',
      text2: 'An error occurred while uploading the files',
    });
    console.error('Upload Error', error.response);
  }
};

export const UpdateProfilePicture = async (files: {
  [key: string]: FileType[] | null;
}) => {
  if (!token) {
    return null;
  }
  console.log('Multiple files', files);

  const formData = new FormData();
  const fields = ['profilePicture'];

  fields.forEach(field => {
    const fileArray = files[field];
    if (fileArray) {
      fileArray.forEach(file => {
        formData.append(field, {
          uri: file.uri,
          type: file.type,
          name: file.name,
          height: file.height,
          width: file.width,
        });
      });
    }
  });
  console.log(formData);
  try {
    const response = await api.put('/api/auth/profile-picture', formData);
    console.log('Upload Success', response.data.data);
    Toast.show({
      text1: 'success!',
      text2: 'File uploaded successfully',
    });
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Oops!',
      text2: 'An error occurred while uploading the files',
    });
    console.error('Upload Error', error.response);
  }
};
