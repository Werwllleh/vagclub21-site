import Link from "next/link";
import {API_URL} from "@/constants";

const Drive2Icon = ({url}) => {
  return (
    <Link href={url} target="_blank" className="drive2-icon">
      <img className="drive2-icon__image" src={`${API_URL}/bot/icons/drive2-logo.webp`} alt="Drive 2"/>
    </Link>
  );
};

export default Drive2Icon;
