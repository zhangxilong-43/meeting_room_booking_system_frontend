import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { meetingRoomListGet } from '@/service/api';
import { meetingRoomListParamsType } from '@/service/api.type';
import { useNavigate } from "react-router-dom";

const tabelData = [
    {
        name: 'Hart Hagerty',
        id: 1,
        from: 'United States',
        title: 'Zemlak, Daniel and Leannon',
        desc: 'Desktop Support Technician',
        color: 'Purple'
    },{
        name: 'Hart Hagerty',
        id: 2,
        from: 'United States',
        title: 'Zemlak, Daniel and Leannon',
        desc: 'Desktop Support Technician',
        color: 'Purple'
    },{
        name: 'Hart Hagerty',
        id: 3,
        from: 'United States',
        title: 'Zemlak, Daniel and Leannon',
        desc: 'Desktop Support Technician',
        color: 'Purple'
    },{
        name: 'Hart Hagerty',
        id: 4,
        from: 'United States',
        title: 'Zemlak, Daniel and Leannon',
        desc: 'Desktop Support Technician',
        color: 'Purple'
    },{
        name: 'Hart Hagerty',
        id: 5,
        from: 'United States',
        title: 'Zemlak, Daniel and Leannon',
        desc: 'Desktop Support Technician',
        color: 'Purple'
    },{
        name: 'Hart Hagerty',
        id: 6,
        from: 'United States',
        title: 'Zemlak, Daniel and Leannon',
        desc: 'Desktop Support Technician',
        color: 'Purple'
    },{
        name: 'Hart Hagerty',
        id: 7,
        from: 'United States',
        title: 'Zemlak, Daniel and Leannon',
        desc: 'Desktop Support Technician',
        color: 'Purple'
    },{
        name: 'Hart Hagerty',
        id: 8,
        from: 'United States',
        title: 'Zemlak, Daniel and Leannon',
        desc: 'Desktop Support Technician',
        color: 'Purple'
    },{
        name: 'Hart Hagerty',
        id: 9,
        from: 'United States',
        title: 'Zemlak, Daniel and Leannon',
        desc: 'Desktop Support Technician',
        color: 'Purple'
    },{
        name: 'Hart Hagerty',
        id: 10,
        from: 'United States',
        title: 'Zemlak, Daniel and Leannon',
        desc: 'Desktop Support Technician',
        color: 'Purple'
    },{
        name: 'Hart Hagerty',
        id: 11,
        from: 'United States',
        title: 'Zemlak, Daniel and Leannon',
        desc: 'Desktop Support Technician',
        color: 'Purple'
    },{
        name: 'Hart Hagerty',
        id: 12,
        from: 'United States',
        title: 'Zemlak, Daniel and Leannon',
        desc: 'Desktop Support Technician',
        color: 'Purple'
    },
]

interface tabelItemType {
    id: string | number,
    name: string,
    capacity: string,
    location: string,
    equipment: string,
    description: string,
};

export default () => {
  const navigate = useNavigate();
  const actionRef = useRef(false);
  const [tabelData, setTabelData] = useState<tabelItemType[]>([]);
  const [meetingRoomListParams, setMeetingRoomListParams] = useState<meetingRoomListParamsType>({
    pageNo: 1,
    pageSize: 12,
    name: '',
    capacity: '',
    equipment: '',
  });

  const getMeetingRoomList = async () => {
    const { data } = await meetingRoomListGet(meetingRoomListParams)
    setTabelData(data.meetingRooms)
  }

  const goSchedule = () => {
    navigate('/schedule')
  };

  useEffect(() => {
    if (actionRef.current) return;
    actionRef.current = true;
    getMeetingRoomList()
  }, [])

  return (
    <>
    <div className="overflow-x-auto bg-primary-content h-[100%]">
        <div className="w-[100%] h-[9vh] bg-primary-content space-x-8 p-[30px]">
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <button className="btn btn-primary">Primary</button>
        </div>
        <div className="h-[77vh] overflow-scroll">
            {
                tabelData.length > 0 ? 
                <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Capacity</th>
                        <th>Location</th>
                        <th>Equipment</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tabelData.map(item => (
                        <tr key={item.id}>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.capacity}
                            </td>
                            <td>
                                {item.location}
                            </td>
                            <td>
                                {item.equipment}
                            </td>
                            <td>
                                {item.description}
                            </td>
                            <th>
                                <button className="btn btn-ghost btn-xs" onClick={goSchedule}>Schedule</button>
                            </th>
                        </tr>
                        ))
                    }
                </tbody>
                </table> : 
                <div className="h-[100%] flex items-center justify-center"><span className="loading loading-bars loading-lg"></span></div>
            }
            
        </div>
        <div className="join float-right mr-[2vw]">
            <button className="join-item btn">«</button>
            <button className="join-item btn">Page 1</button>
            <button className="join-item btn">»</button>
        </div>
    </div>
    </>
  );
};
