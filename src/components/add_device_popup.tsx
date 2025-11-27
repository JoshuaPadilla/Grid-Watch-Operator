import React, { useState } from "react";
import { useDeviceStore } from "../store/useDeviceStore";

interface Props {
  show: boolean;
  hideAddDevice: (value: boolean) => void;
}

function AddDevicePopup({ show, hideAddDevice }: Props) {
  const { addDevice } = useDeviceStore();

  const [deviceId, setDeviceId] = useState("");
  const [deviceName, setDeviceName] = useState("");

  const handleSubmit = () => {
    if (!deviceId) return;

    addDevice(deviceId);
  };

  return (
    <div
      className={`${
        show ? "" : "hidden"
      } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-slate-300/80 z-1000000 rounded-xl`}
    >
      <h3 className="font-bold text-(--background) text-xl">Add Device</h3>

      {/* Input fields */}
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2">
          <h3>Device ID</h3>
          <input
            type="text"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            className="w-full border-(--background) border rounded-sm p-2"
          />
        </div>

        {/* <div className="flex flex-col gap-2">
          <h3>Device Name</h3>
          <input
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="border-(--background) border rounded-sm p-2"
          />
        </div> */}
      </div>

      {/* Buttons */}
      <div className="flex flex-col mt-4 gap-2">
        <button
          className="p-2 flex flex-row justify-center bg-(--primary) rounded-md"
          onClick={handleSubmit}
        >
          <span className="text-xl font-semibold">Submit</span>
        </button>

        <button
          className="p-2 flex flex-row justify-center bg-slate-300 rounded-md"
          onClick={() => hideAddDevice(false)}
        >
          <span className="text-xl font-semibold">Cancel</span>
        </button>
      </div>
    </div>
  );
}

export default AddDevicePopup;
