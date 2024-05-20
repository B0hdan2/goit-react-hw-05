import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

function Navigation() {
  return (
    <>
      <header className={s.header}>
        <div className='container'>
          <nav>
            <ul className={s.list}>
              <li className={s.item}>
                <NavLink className={s.link} to='/'>
                  Home
                </NavLink>
              </li>
              <li className={s.item}>
                <NavLink className={s.link} to='movies'>
                  Movies
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navigation;
