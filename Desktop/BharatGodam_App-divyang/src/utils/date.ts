export const convertDate = (dateString: string | number) => {
  dateString = String(dateString);
  const year = Number(dateString.slice(0, 4));
  const month = Number(dateString.slice(4, 6)) - 1;
  const day = Number(dateString.slice(6, 8));
  let monthName = new Date(year, month, day).toLocaleDateString('en-US', {
    month: 'short',
  });
  return `${day} ${monthName} ${year} `;
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
}

export function convertToReadableTime(time: number): string {
  const timeString = time.toString().padStart(6, '0'); // Ensure the string is 6 digits
  const hours = timeString.slice(0, 2);
  const minutes = timeString.slice(2, 4);

  return `${parseInt(hours, 10)}:${minutes}`;
}
