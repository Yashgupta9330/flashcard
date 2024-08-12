import { Link } from "react-router-dom";
import HomeIcon from "./icons/HomeIcon";
import LayoutGridIcon from "./icons/LayoutGridIcon";
import UsersIcon from "./icons/userIcon";
import SettingsIcon from "./icons/SettingsIcon";

const Sidebar = () => {
    return(
        <div className="hidden lg:block">
        <div className="bg-black dark:bg-white w-60 border-r border-muted flex flex-col min-h-screen text-white dark:text-black">
        <div className="p-4 border-b border-muted">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-md">
                <HomeIcon className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/flashcards" className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-md">
                <LayoutGridIcon className="w-5 h-5" />
                <span>Flashcards</span>
              </Link>
            </li>
            <li>
              <Link to="/users" className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-md">
                <UsersIcon className="w-5 h-5" />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-md">
                <SettingsIcon className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      </div>
    )
}

export default Sidebar;