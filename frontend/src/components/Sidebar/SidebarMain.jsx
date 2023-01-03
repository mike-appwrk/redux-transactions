import { NavLink } from "react-router-dom";
import navLinks from "../../lib/navLinks";

function SidebarMain () {
  return (
    <div className="text-primary-600">
      <h2 className="text-xs uppercase tracking-widest mb-8">Overview</h2>
      <nav>
        <ul>
          {navLinks.map(({ title, url, icon, index }) => (
            <li key={`${url}-${index}`}>
              <NavLink to={url} className="pr-10 flex gap-4 items-center mb-4">
               <span><img src={icon} alt={`icon-${title}`}/></span>
               <span>{ title }</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default SidebarMain;
