import SvgIcon from "@material-ui/core/SvgIcon";

export default function Icon(props) {
  return (
    <SvgIcon viewBox="0 0 512 512" fill="none" {...props}>
      <path
        d="M128 0C110.4 0 96 14.4 96 32V480C96 497.6 110.4 512 128 512H448C465.6 512 480 497.6 480 480V128L352 0H128Z"
        fill="#E2E5E7"
      />
      <path
        d="M384 128H480L352 0V96C352 113.6 366.4 128 384 128Z"
        fill="#B0B7BD"
      />
      <path d="M480 224L384 128H480V224Z" fill="#CAD1D8" />
      <path
        d="M416 416C416 424.8 408.8 432 400 432H48C39.2 432 32 424.8 32 416V256C32 247.2 39.2 240 48 240H400C408.8 240 416 247.2 416 256V416Z"
        fill="#F15642"
      />
      <path
        d="M101.744 303.152C101.744 298.928 105.072 294.32 110.432 294.32H139.984C156.624 294.32 171.6 305.456 171.6 326.8C171.6 347.024 156.624 358.288 139.984 358.288H118.624V375.184C118.624 380.816 115.04 384 110.432 384C106.208 384 101.744 380.816 101.744 375.184V303.152V303.152ZM118.624 310.432V342.304H139.984C148.56 342.304 155.344 334.736 155.344 326.8C155.344 317.856 148.56 310.432 139.984 310.432H118.624Z"
        fill="white"
      />
      <path
        d="M196.656 384C192.432 384 187.824 381.696 187.824 376.08V303.408C187.824 298.816 192.432 295.472 196.656 295.472H225.952C284.416 295.472 283.136 384 227.104 384H196.656V384ZM204.72 311.088V368.4H225.952C260.496 368.4 262.032 311.088 225.952 311.088H204.72V311.088Z"
        fill="white"
      />
      <path
        d="M303.872 312.112V332.448H336.496C341.104 332.448 345.712 337.056 345.712 341.52C345.712 345.744 341.104 349.2 336.496 349.2H303.872V376.064C303.872 380.544 300.688 383.984 296.208 383.984C290.576 383.984 287.136 380.544 287.136 376.064V303.392C287.136 298.8 290.592 295.456 296.208 295.456H341.12C346.752 295.456 350.08 298.8 350.08 303.392C350.08 307.488 346.752 312.096 341.12 312.096H303.872V312.112Z"
        fill="white"
      />
      <path
        d="M400 432H96V448H400C408.8 448 416 440.8 416 432V416C416 424.8 408.8 432 400 432Z"
        fill="#CAD1D8"
      />
    </SvgIcon>
  );
}

Icon.defaultProps = { colorfill: "black", width: "30", height: "30" };
