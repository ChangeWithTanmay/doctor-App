export interface Location {
  id: string;
  name: string;
  address: string;
  isDefault?: boolean;
}

export const savedLocations: Location[] = [
  {
    id: '1',
    name: 'Home',
    address: '123 Main Street, New York, NY 10001',
    isDefault: true
  },
  {
    id: '2',
    name: 'Work',
    address: '555 Business Ave, New York, NY 10018'
  },
  {
    id: '3',
    name: 'Gym',
    address: '789 Fitness Blvd, New York, NY 10022'
  }
];