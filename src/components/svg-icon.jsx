const SvgIcon = ({name}) => {
  return (
    <svg className="icon" aria-hidden="true">
      <use href={`/images/sprite.svg#${name}`}></use>
    </svg>
  );
};

export default SvgIcon;
