import { SiFoodpanda } from "react-icons/si";
import s from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={s.error}>
      <p className={s.text}>Oops something is wrong</p>
      <SiFoodpanda className={s.svg} />
    </div>
  );
}

export default NotFoundPage;
