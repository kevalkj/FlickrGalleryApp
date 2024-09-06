import AsyncStorage from '@react-native-async-storage/async-storage';
import {Booking} from '../service/api';
import {FarmerBooking} from '../types/entities';
//import { convertDate } from '../utils/date';

export interface Notification {
  title: string;
  content: string;
  read: boolean;
  time: string;
}

export const fetchNotificationsFromAPI = async (
  cachedNotifications: Notification[],
): Promise<Notification[]> => {
  try {
    const response = await Booking.get_all_bookings_farmer();
    const bookings: FarmerBooking[] = response;

    const today = new Date();
    const upcomingNotifications: Notification[] = [];

    bookings.forEach(booking => {
      // Check if expiryDateOfDeposit is present before processing
      if (booking.expiryDateOfDeposit) {
        const expiryDate = new Date(booking.expiryDateOfDeposit);
        const daysUntilExpiry = daysToExpiry(expiryDate);

        if (daysUntilExpiry <= 7 && daysUntilExpiry > 3) {
          upcomingNotifications.push({
            title: 'Your booking expires in 7 days',
            content: `Your booking with booking ID ${
              booking._id
            } is going to expire on ${convertDate(
              expiryDate,
            )}. Please take action.`,
            read: false,
            time: `${daysUntilExpiry} days left`,
          });
        } else if (daysUntilExpiry > 0 && daysUntilExpiry <= 3) {
          upcomingNotifications.push({
            title: 'Your booking expires in 3 days',
            content: `Your booking with booking ID ${
              booking._id
            } is going to expire on ${convertDate(
              expiryDate,
            )}. Act quickly to avoid issues.`,
            read: false,
            time: `${daysUntilExpiry} days left`,
          });
        } else {
          upcomingNotifications.push({
            title: 'Booking Expired',
            content: `Your booking with booking ID ${
              booking._id
            } has expired on ${convertDate(expiryDate)}.`,
            read: false,
            time: 'Expired',
          });
        }
      }
    });

    return upcomingNotifications.map(notification => {
      const cached = cachedNotifications.find(
        c =>
          c.title === notification.title && c.content === notification.content,
      );
      return cached ? {...notification, read: cached.read} : notification;
    });
  } catch (error) {
    console.error('Failed to fetch notifications', error);
    throw new Error('Failed to fetch notifications');
  }
};

const daysToExpiry = (expiryDate: Date): number => {
  const today = new Date();
  // Calculate difference in milliseconds
  const diffInMs = expiryDate.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  return diffInDays;
};

export const convertDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-GB', options);
};

// Function to cache notifications
export const cacheNotifications = async (notifications: Notification[]) => {
  try {
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {
    console.error('Failed to cache notifications', error);
  }
};

// Function to get cached notifications
export const getCachedNotifications = async (): Promise<
  Notification[] | null
> => {
  try {
    const notifications = await AsyncStorage.getItem('notifications');
    return notifications ? JSON.parse(notifications) : null;
  } catch (error) {
    console.error('Failed to retrieve cached notifications', error);
    return null;
  }
};
