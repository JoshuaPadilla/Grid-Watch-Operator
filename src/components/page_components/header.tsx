import React from "react";
import { Icons } from "../../constants/icons.constant";

function Header() {
  return (
    <header className="p-2 bg-(--background) flex flex-row justify-between border-b-2 border-b-(--card_bg)">
      <div className="p-2 flex flex-row gap-4 items-center">
        <img src={Icons.app_logo} alt="app logo" className="size-10" />
        <h3 className="font-bold text-white text-2xl">GridWatch</h3>
      </div>

      <div>
        <ul className="flex flex-row gap-4 text-white font-medium h-full items-center">
          <li className="py-2 px-4 bg-(--primary) rounded-lg">
            <button onClick={() => console.log("Hello")}>Dashboard</button>
          </li>
          <li className="py-2 px-4 bg-(--primary) rounded-lg">
            <button onClick={() => console.log("Hello")}>History</button>
          </li>
          <li className="py-2 px-4 bg-(--primary) rounded-lg">
            <button onClick={() => console.log("Hello")}>Insights</button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
