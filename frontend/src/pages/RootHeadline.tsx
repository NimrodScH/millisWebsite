import { useLocation } from "react-router-dom";


function RootHeadline(props: {
  firstH1: string;
  firstClassName?: string;
  secondH1: string;
  secondClassName?: string;
  firstSubtitle?: string;
  subtitleClassName?:string;
  secondSubtitle?: string;
}) {
  const location = useLocation();
 
    return (
      <>
      <h2 className= {props.firstClassName || "home-text10 Heading1"}>
        <span>
          {props.firstH1}
          <br />
        </span>
        <span className={props.secondClassName || "home-text12 Heading2"}>{props.secondH1}</span>
      </h2>
      {(props.firstSubtitle || props.secondSubtitle) && (
        <span className={props.subtitleClassName || "home-text14"}>
          {props.firstSubtitle && (
            <>
              <span>{props.firstSubtitle}</span> <br />
            </>
          )}
          {props.secondSubtitle && (
            <>
              {" "}
              <span>{props.secondSubtitle}</span>
            </>
          )}
        </span>
      )}
    </>
    );
}
export default RootHeadline;
