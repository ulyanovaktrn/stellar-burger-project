import { TOrdersData } from "@utils-types";

export const feedMock: TOrdersData = {
    orders: [
      {
        _id: '67361586b27b06001c3e82cd',
        ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0948',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa094a',
            '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный space астероидный альфа-сахаридный spicy бургер',
        createdAt: '2025-05-25T15:21:42.590Z',
        updatedAt: '2025-05-25T15:21:43.439Z',
        number: 59406
      },
      {
        _id: '67366ab1b27b06001c3e841c',
        ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0947',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0947',
            '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный фалленианский био-марсианский бургер',
        createdAt: '2025-05-25T21:25:05.231Z',
        updatedAt: '2025-05-25T21:25:06.086Z',
        number: 59447
      },
      {
        _id: '673691d3b27b06001c3e844a',
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
        status: 'done',
        name: 'Краторный space бургер',
        createdAt: '2025-05-25T00:12:03.801Z',
        updatedAt: '2025-05-25T00:12:04.682Z',
        number: 59449
      }
    ],
    total: 2405,
    totalToday: 22
};
