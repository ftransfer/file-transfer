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
        fill="#925B00"
      />
      <path
        d="M96.816 314.656C99.76 289.84 137.232 285.376 154.896 298.944C163.6 305.968 154.384 317.104 146.704 311.472C137.232 305.456 115.744 302.64 113.056 315.936C109.6 336.928 165.248 324.912 164.368 358.928C163.472 391.424 116.384 392.192 98.72 377.6C94.496 374.16 94.624 368.544 96.928 365.072C100.256 361.76 103.968 360.608 108.32 364.176C118.8 371.344 145.808 376.72 147.712 358.528C146.064 339.616 92.848 351.008 96.816 314.656Z"
        fill="white"
      />
      <path
        d="M209.12 378.256L175.344 307.504C170.352 297.392 185.456 289.088 191.072 299.696L202.464 325.408L217.168 359.184L231.616 325.408L243.008 299.696C248.128 289.984 262.96 296.112 258.624 306.736L226 378.256C223.056 386.32 213.984 388.224 209.12 378.256Z"
        fill="white"
      />
      <path
        d="M345.76 374.16C336.672 381.696 325.536 384.912 314.288 384.912C287.408 384.912 268.352 369.552 268.352 339.104C268.352 313.264 288.448 293.184 315.424 293.184C325.536 293.184 336.656 296.64 344.592 304.448C352.384 312.112 341.136 323.504 333.472 316.736C328.736 312.112 322.08 308.672 315.424 308.672C299.952 308.672 284.992 321.072 284.992 339.104C284.992 358.048 297.52 369.552 314.288 369.552C322.08 369.552 328.736 367.248 333.472 363.792V348.08H314.288C302.896 348.08 304.048 332.448 314.288 332.448H339.872C344.608 332.448 348.944 336.048 348.944 340.016V367.264C348.96 369.552 347.936 371.712 345.76 374.16Z"
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
