import type { HotWheelsModel } from './types';

export const mockDatabase = {
  models: [
    {
      id: '1',
      name: 'Tesla Model S',
      series: 'HW Green Speed',
      year: 2023,
      color: '#FF0000',
      tampos: ['Tesla Logo', 'Side Stripes'],
      owned: false,
      notes: 'First edition',
      imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      collectionNumber: 'GTR567'
    },
    {
      id: '2',
      name: 'Porsche 911 GT3 RS',
      series: 'HW Exotics',
      year: 2023,
      color: '#0000FF',
      tampos: ['Porsche Logo', 'Racing Stripes'],
      owned: false,
      imageUrl: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      collectionNumber: 'EXO789'
    },
    {
      id: '3',
      name: 'Lamborghini Huracán',
      series: 'HW Exotics',
      year: 2022,
      color: '#00FF00',
      tampos: ['Lamborghini Logo', 'Racing Number'],
      owned: false,
      imageUrl: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      collectionNumber: 'EXO456'
    }
  ] as HotWheelsModel[]
};