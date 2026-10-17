"use client";

import dynamic from "next/dynamic";

const TravelMap = dynamic(() => import("./TravelMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[340px] items-center justify-center bg-stone-50 text-sm text-stone-500">
      Loading map...
    </div>
  ),
});

type TravelMapLoaderProps = {
  latitude: number;
  longitude: number;
  name: string;
};

export default function TravelMapLoader(props: TravelMapLoaderProps) {
  return <TravelMap {...props} />;
}
