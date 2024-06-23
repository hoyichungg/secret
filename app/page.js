'use client'
import React, { useState, useCallback } from 'react';
import RoomAllocation from '@/components/RoomAllocation';
import { getDefaultRoomAllocation } from '@/utils/getDefaultRoomAllocation';


export default function Home() {
  const [guest, setGuest] = useState({ adult: 7, child: 3 });
  const [rooms, setRooms] = useState([
    { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
    { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
    { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
    { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
  ]);

  const { bestAllocation } = getDefaultRoomAllocation(guest, rooms);
  const [roomInputs, setRoomInputs] = useState(bestAllocation.map(() => ({ adults: 0, children: 0, price: 0 })));

  const handleInputChange = useCallback((index, field, newValue) => {
    setRoomInputs(currentRoomInputs => {
      return currentRoomInputs.map((room, idx) => {
        if (idx === index) {
          const parsedValue = Number(newValue);
          return { ...room, [field]: parsedValue };
        }
        return room;
      });
    });
  }, [roomInputs]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RoomAllocation
        guest={guest}
        rooms={rooms}
        onChange={handleInputChange}
        bestAllocation={bestAllocation}
        roomInputs={roomInputs}
        setRoomInputs={setRoomInputs}
      />
    </main>
  );
}
