import React from "react";

function DeviceCard() {
  return (
    <li className="px-4 py-2 bg-white rounded-lg shadow-lg border-l-8 border-(--safe)">
      <div className="flex flex-row justify-between items-center mb-1">
        <div className="flex flex-row gap-2">
          <p>Device ID:</p>
          <p>0192301</p>
        </div>

        <button className="px-2 bg-(--primary)/70 rounded-md font-light text-sm">
          View
        </button>
      </div>

      <div className="flex flex-row gap-2">
        <p>Location:</p>
        <p>Bgry. Payahan Calbayog City</p>
      </div>
    </li>
  );
}

export default DeviceCard;
