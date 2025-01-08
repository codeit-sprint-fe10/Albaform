type RadioIconProps = {
  isSelected: boolean;
};

const RadioIcon = ({ isSelected }: RadioIconProps) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="RadioButton">
        <rect
          x="0.5"
          y="0.5"
          width="21"
          height="21"
          rx="10.5"
          stroke={isSelected ? '#F89A05' : '#C4C4C4'}
        />
        {isSelected && (
          <circle id="Ellipse 465" cx="11" cy="11" r="5" fill="#F89A05" />
        )}
      </g>
    </svg>
  );
};

export default RadioIcon;
