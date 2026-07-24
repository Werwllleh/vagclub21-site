import Link from "next/link";
import styled from "styled-components";
import SvgIcon from "@/components/svg-icon";

export const Drive2 = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12rem;
    height: 5rem;
    background-color: #c03;
    
    svg {
        width: 100%;
        height: 100%;
    }
`

const Drive2Icon = ({url}) => {

  if (!url) return null;

  return (
    <Drive2 href={url} target="_blank">
      <SvgIcon name={"drive2"}/>
    </Drive2>
  );
};

export default Drive2Icon;
