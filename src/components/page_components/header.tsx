import { Icons } from "../../constants/icons.constant";
import { useNavStore } from "../../store/useNavStore";
import { NAVIGATION } from "../../types/nav.type";

function Header() {
  const { changeNav } = useNavStore();
  const { activeNav } = useNavStore();

  return (
    <header className="p-2 bg-(--background) flex flex-row justify-between border-b-2 border-b-(--card_bg)">
      <div className="p-2 flex flex-row gap-4 items-center">
        <img src={Icons.app_logo} alt="app logo" className="size-10" />
        <h3 className="font-bold text-white text-2xl">
          {activeNav === NAVIGATION.DASHBOARD
            ? "GridWatch"
            : activeNav.toLocaleUpperCase()}
        </h3>
      </div>

      <div>
        <ul className="flex flex-row gap-4 text-white font-medium h-full items-center">
          <li>
            <button
              onClick={() => changeNav(NAVIGATION.DASHBOARD)}
              className="py-2 px-4 bg-(--primary) rounded-lg"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => changeNav(NAVIGATION.HISTORY)}
              className="py-2 px-4 bg-(--primary) rounded-lg"
            >
              History
            </button>
          </li>
          <li>
            <button
              onClick={() => changeNav(NAVIGATION.INSIGHTS)}
              className="py-2 px-4 bg-(--primary) rounded-lg"
            >
              Insights
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
