import { BsJournalCheck } from "react-icons/bs";
import { MdDeblur } from "react-icons/md";
import { BiGridAlt } from "react-icons/bi";

export const getIcon = (icon: string) => {
  switch (icon) {
    case "icon-marketing":
      return BiGridAlt;
    case "icon-finance":
      return MdDeblur;
    case "icon-people":
      return BsJournalCheck;
    default:
      return null;
  }
};
