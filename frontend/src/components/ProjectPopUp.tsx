import { useEffect, useRef } from "react";
import "./ProjectPopUp.css";
import SliderInProjectCard from "./SliderInProjectCard";
import RootHeadline from "../pages/RootHeadline";

type ProjectType = {
    firstName: string;
    lastName: string;
    imageSrc: string;
    images?: string[];
    text: string;
    isClicked?: boolean;
    index?: number;
    isMouseHover?: boolean;
    customClass?: string;
    onCardClick?: () => void;
  };

const ProjectPopUp = ({ open, onClose, project }: { open: boolean; onClose: () => void; project:ProjectType }) => {
const dialogRef = useRef<HTMLDialogElement>(null);

useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

    return( <dialog ref={dialogRef} onClose={onClose} onClick={(e) => e.stopPropagation()} className="result-modal">
        <RootHeadline firstH1={project.firstName} secondH1={project.lastName}/>
        <p>
            {project.text}
        </p>
        {project.images &&
        <SliderInProjectCard
          images={project.images}              />
        }
        <form method="dialog">
            <button className="close-button-fn">x</button>
        </form>
    </dialog>
)}
export default ProjectPopUp;