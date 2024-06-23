"use client"
import React from 'react';
import CustomInputNumber from './CustomInputNumber';
import './RoomAllocation.css';

function RoomAllocation({ guest, rooms, onChange, bestAllocation, roomInputs, setRoomInputs }) {
    const { adult, child } = guest;

    const handleBlur = (index, field, event) => {

        let newValue = parseInt(event.target.value, 10);

        if (event.target.name === 'adult') {
            newValue = Math.max(0, Math.min(adult, newValue));
        }
        if (event.target.name === 'child') {
            newValue = Math.max(0, Math.min(child, newValue));
        }
        onChange(index, field, newValue);
    };

    const selectedAdults = roomInputs.reduce((acc, room) => acc + room.adults, 0);
    const selectedChildren = roomInputs.reduce((acc, room) => acc + room.children, 0);
    return (
        <div className="room-allocation-container">
            <div className="room-allocation-header">{`住客人数：${adult} 位大人、${child} 位小孩 / ${bestAllocation.length} 房`}</div>

            <div className="unassigned-section">
                <p>尚未分配</p>
                <div className="text-sm">大人: {`${adult - selectedAdults}`}</div>
                <div className="text-sm ml-2">小孩: {`${child - selectedChildren}`}</div>
            </div>


            {roomInputs?.map((r, i) => (
                <div className="room-details" key={i}>
                    <div className="room-title">{`房間：${r.adults + r.children}人`}</div>

                    <div className="room-item">
                        <div className="adult-container">
                            <span>大人</span>
                            <span className="text-gray-400">年齡 20+</span>
                        </div>

                        <CustomInputNumber
                            min={0}
                            max={adult}
                            step={1}
                            name='adult'
                            value={parseInt(r.adults, 10)}
                            disabled={false}
                            onChange={(newValue) => onChange(i, 'adults', newValue)}
                            onBlur={(e) => handleBlur(i, 'adults', e)}
                        />
                    </div>

                    <div className="room-item">
                        <span>小孩</span>
                        <CustomInputNumber
                            min={0}
                            max={child}
                            step={1}
                            value={parseInt(r.children, 10)}
                            name='child'
                            disabled={false}
                            onChange={(newValue) => onChange(i, 'children', newValue)}
                            onBlur={(e) => handleBlur(i, 'children', e)}

                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RoomAllocation;
