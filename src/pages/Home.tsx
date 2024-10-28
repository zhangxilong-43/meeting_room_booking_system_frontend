import React from "react";
import Spline from '@splinetool/react-spline';
import RoomTable from "@/components/RoomTable";

export function Home() {
    return (
       <>
            <div className="w-[96vw] h-[92vh] m-[2vw] my-[4vh] rounded-lg overflow-hidden bg-primary-content">
                <Spline className="absolute top-[-36vh] right-[-47vw] " scene="https://prod.spline.design/q8ZBxMm4fHzexTUh/scene.splinecode" />
                <RoomTable />
            </div>
       </>
    )
}