"use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function KleaMap() {
  return (
    <Map
      center={{ lat: 37.58141, lng: 126.8874 }}
      className="w-full h-[500px] mt-16"
    >
      <MapMarker position={{ lat: 37.58141, lng: 126.8874 }}>
        <div className="px-3 min-w-[100px]">한국지방교육행정연구재단</div>
      </MapMarker>
    </Map>
  );
}
