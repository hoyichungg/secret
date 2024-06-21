import { getDefaultRoomAllocation } from "./getDefaultRoomAllocation";

describe('getDefaultRoomAllocation function', () => {
    test('case 1', () => {
        const guest = { adult: 4, child: 2 }
        const rooms = [
            { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
            { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
        ]

        const { minTotalPrice } = getDefaultRoomAllocation(guest, rooms);
        expect(minTotalPrice).toEqual(2600);
    });

    test('case 2', () => {
        const guest = { adult: 7, child: 3 }
        const rooms = [
            { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
            { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
            { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
            { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
        ]

        const { minTotalPrice } = getDefaultRoomAllocation(guest, rooms);
        expect(minTotalPrice).toEqual(8000);
    });

    test('case 3', () => {
        const guest = { adult: 16, child: 0 }
        const rooms = [
            { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
            { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
            { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
            { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
        ]

        const { minTotalPrice } = getDefaultRoomAllocation(guest, rooms);
        expect(minTotalPrice).toEqual(9000);
    });

    test('case 4', () => {
        const guest = { adult: 1, child: 1 }
        const rooms = [
            { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 2 },
            { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
        ]

        const { minTotalPrice } = getDefaultRoomAllocation(guest, rooms);
        expect(minTotalPrice).toEqual(800);
    });

    test('case 5', () => {
        const guest = { adult: 2, child: 0 }
        const rooms = [
            { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 2 },
            { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
        ]

        const { minTotalPrice } = getDefaultRoomAllocation(guest, rooms);
        expect(minTotalPrice).toEqual(1000);
    });

    test('case 6', () => {
        const guest = { adult: 0, child: 1 }
        const rooms = [
            { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
            { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
            { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
            { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
        ]

        const { minTotalPrice } = getDefaultRoomAllocation(guest, rooms);
        expect(minTotalPrice).toEqual(Infinity);
    });

    test('case 7', () => {
        const guest = { adult: 0, child: 0 }
        const rooms = [
            { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
            { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
            { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
            { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
        ]

        const { minTotalPrice } = getDefaultRoomAllocation(guest, rooms);
        expect(minTotalPrice).toEqual(0);
    });

    test('case 8', () => {
        const guest = { adult: 1, child: 0 }
        const rooms = [
            { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
            { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
            { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
            { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
        ]

        const { minTotalPrice } = getDefaultRoomAllocation(guest, rooms);
        expect(minTotalPrice).toEqual(500);
    });

});
