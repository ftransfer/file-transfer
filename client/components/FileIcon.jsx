import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

import IcExcel from "~/icons/IcExcel";
import IcWord from "~/icons/IcWord";
import IcPowerPoint from "~/icons/IcPowerPoint";
import IcPdf from "~/icons/IcPdf";
import IcSvg from "~/icons/IcSvg";
import IcJson from "~/icons/IcJson";
import IcIni from "~/icons/IcIni";
import IcImage from "~/icons/IcImage";
import IcVideo from "~/icons/IcVideo";

export default function Fileicon(props) {
  switch (props.ext.toLowerCase()) {
    case "directory":
      return <FolderIcon {...props} style={{ color: "#ffb74d" }} />;
    case "doc":
    case "docx":
      return <IcWord {...props} />;
    case "xls":
    case "xlsx":
      return <IcExcel {...props} />;
    case "ppt":
    case "pptx":
      return <IcPowerPoint {...props} />;
    case "pdf":
      return <IcPdf {...props} />;
    case "svg":
      return <IcSvg {...props} />;
    case "json":
      return <IcJson {...props} />;
    case "ini":
      return <IcIni {...props} />;
    case "jpg":
    case "jpeg":
    case "jfif":
    case "png":
    case "exif":
    case "tiff":
    case "giv":
    case "bmp":
    case "ppm":
    case "pgm":
    case "pbm":
    case "pnm":
    case "webp":
    case "hdr":
    case "heif":
    case "img":
    case "ico":
    case "eps":
    case "raw":
      return <IcImage {...props} />;
    case "webm":
    case "mkv":
    case "flv":
    case "vob":
    case "ogv":
    case "ogg":
    case "rrc":
    case "gifv":
    case "mng":
    case "mov":
    case "avi":
    case "qt":
    case "wmv":
    case "yuv":
    case "rm":
    case "asf":
    case "amv":
    case "mp4":
    case "m4p":
    case "m4v":
    case "mpg":
    case "mp2":
    case "mpeg":
    case "mpe":
    case "mpv":
    case "m4v":
    case "svi":
    case "3gp":
    case "3g2":
    case "mxf":
    case "roq":
    case "nsv":
    case "flv":
    case "f4v":
    case "f4p":
    case "f4a":
    case "f4b":
      return <IcVideo {...props} />;
    default:
      return <InsertDriveFileIcon {...props} />;
  }
}
