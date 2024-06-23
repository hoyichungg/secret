// 有 child 的 room 至少要有一個 adult 分配在同一間 room,每個房間都有基礎的 roomPrice 和分配人數上限的 capacity

// 每分配一個 adult 或 child 都會加上對應的 adultPrice 或 childPrice,所以每間房價格為 roomPrice + adultPrice*adult + childPrice*child

// 請找出最低的 totalPrice

// const guest = { adult: 4, child: 2 }
// const rooms = [
//     { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
//     { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
// ]

// const guest = { adult: 7, child: 3 }
// const rooms = [
//     { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
//     { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
//     { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
//     { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
// ]

// const guest = { adult: 16, child: 0 }
// const rooms = [
//     { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
//     { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
//     { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
//     { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
// ]

export function getDefaultRoomAllocation(guest, rooms) {
    let minTotalPrice = Infinity; // 設為無限大方便找到更低的價格更新 如果{ adult: 0, child: 1 }會回傳Infinity
    let bestAllocation = null; // 紀錄最佳分配方案

    // 算$用的 每間房價格為 roomPrice + adultPrice*adult + childPrice*child
    function calculatePrice(allocation) {
        return allocation.reduce((total, roomAlloc, idx) => {
            const room = rooms[idx];
            const adultsInRoom = roomAlloc.adult;
            const childrenInRoom = roomAlloc.child;
            if (adultsInRoom === 0 && childrenInRoom === 0) {
                return total;
            }
            return total + room.roomPrice + (room.adultPrice * adultsInRoom) + (room.childPrice * childrenInRoom);
        }, 0);
    }

    // 檢查是否有效
    function isValidAllocation(allocation) {
        return allocation.every((alloc, idx) => {
            const room = rooms[idx];
            // adult + child 不能超過capacity
            // 有 child 的 room 至少要有一個 adult
            return (alloc.adult + alloc.child <= room.capacity) && (alloc.child === 0 || alloc.adult > 0);
        });
    }

    //回溯  
    //allocation:當前的分配方案  adultLeft:剩餘的未分配成人數量  childLeft:剩餘的未分配兒童數量  idx:當前處理的房間index
    function backtrack(allocation, adultLeft, childLeft, idx) {
        // 如果 idx === rooms.length 代表已經都遍歷完所有的房間
        if (idx === rooms.length) {
            // 確認是否都分配完
            if (adultLeft === 0 && childLeft === 0 && isValidAllocation(allocation)) {
                const price = calculatePrice(allocation);
                // 如果價格小於minTotalPrice 更新 minTotalPrice 和 bestAllocation
                if (price < minTotalPrice) {
                    minTotalPrice = price;
                    bestAllocation = allocation.map(a => ({ ...a }));
                }
            }
            return;
        }

        const room = rooms[idx];
        // 遍歷所有可能的成人數量  0 到 adultLeft
        for (let adults = 0; adults <= adultLeft; adults++) {
            // 遍歷所有可能的兒童數量 0 到 childLeft
            for (let children = 0; children <= childLeft; children++) {
                // 如果當前房間分配 沒有成人 有兒童 跳過
                if (children > 0 && adults === 0) continue;

                const roomCost = room.roomPrice + (room.adultPrice * adults) + (room.childPrice * children);
                // 增加目前房間分配
                allocation.push({ adult: adults, child: children, price: roomCost });
                // 處理下一個房間 遞迴  並更新剩餘的成人和兒童數量
                backtrack(allocation, adultLeft - adults, childLeft - children, idx + 1);
                // 移除當前房間分配 保持一致性
                allocation.pop();
            }
        }
    }

    backtrack([], guest.adult, guest.child, 0);

    // 這裡會出現都是0的狀況 先使用filter
    if (bestAllocation) {
        bestAllocation = bestAllocation.filter(roomAlloc => roomAlloc.adult > 0 || roomAlloc.child > 0);
    }

    // 回傳最低價格 分配方法
    return { minTotalPrice, bestAllocation };
}
