import {useUiStore} from "../store/ui.store";

const Burger = ({...props}) => {

  const mobileMenuActive = useUiStore((state) => state.mobileMenuActive)

  return (
    <button
      {...props}
      className={`burger ${mobileMenuActive ? "active" : ""}`}
    >
      <span></span>
    </button>
  );
};

export default Burger;
