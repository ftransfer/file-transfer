import SvgIcon from "@material-ui/core/SvgIcon";

export default function Icon(props) {
  return (
    <SvgIcon viewBox="0 0 512 512" fill="none" {...props}>
      <path
        d="M496 432.004H272C263.168 432.004 256 424.868 256 416.004C256 407.14 256 104.836 256 96.004C256 87.172 263.168 80.004 272 80.004H496C504.832 80.004 512 87.172 512 96.004V416.004C512 424.868 504.832 432.004 496 432.004Z"
        fill="#ECEFF1"
      />
      <path
        d="M432 176.004H272C263.168 176.004 256 168.868 256 160.004C256 151.14 263.168 144.004 272 144.004H432C440.832 144.004 448 151.172 448 160.004C448 168.836 440.832 176.004 432 176.004Z"
        fill="#1976D2"
      />
      <path
        d="M432 240.004H272C263.168 240.004 256 232.868 256 224.004C256 215.14 263.168 208.004 272 208.004H432C440.832 208.004 448 215.172 448 224.004C448 232.836 440.832 240.004 432 240.004Z"
        fill="#1976D2"
      />
      <path
        d="M432 304.004H272C263.168 304.004 256 296.868 256 288.004C256 279.14 263.168 272.004 272 272.004H432C440.832 272.004 448 279.172 448 288.004C448 296.836 440.832 304.004 432 304.004Z"
        fill="#1976D2"
      />
      <path
        d="M432 368.004H272C263.168 368.004 256 360.868 256 352.004C256 343.14 263.168 336.004 272 336.004H432C440.832 336.004 448 343.172 448 352.004C448 360.836 440.832 368.004 432 368.004Z"
        fill="#1976D2"
      />
      <path
        d="M282.208 19.716C278.56 16.644 273.664 15.364 269.056 16.292L13.056 64.292C5.504 65.7 0 72.324 0 80.004V432.004C0 439.684 5.472 446.308 13.056 447.716L269.056 495.716C270.048 495.908 271.008 496.004 272 496.004C275.712 496.004 279.328 494.724 282.208 492.324C285.888 489.284 288 484.772 288 480.004V32.004C288 27.236 285.888 22.756 282.208 19.716Z"
        fill="#1565C0"
      />
      <path
        d="M207.904 337.796C207.072 345.124 201.312 350.98 193.984 351.876C193.312 351.972 192.672 352.004 192 352.004C185.408 352.004 179.392 347.908 177.024 341.636L144 253.572L110.976 341.636C108.416 348.484 101.696 352.676 94.272 351.908C87.008 351.14 81.184 345.508 80.16 338.244L64.16 226.244C62.912 217.54 68.992 209.412 77.728 208.164C86.496 206.884 94.592 212.996 95.84 221.732L102.976 271.78L128.992 202.372C133.664 189.892 154.272 189.892 158.976 202.372L183.488 267.716L192.096 190.212C193.088 181.444 201.216 175.14 209.76 176.068C218.56 177.092 224.864 184.996 223.904 193.764L207.904 337.796Z"
        fill="#FAFAFA"
      />
    </SvgIcon>
  );
}

Icon.defaultProps = { colorfill: "black", width: "30", height: "30" };
