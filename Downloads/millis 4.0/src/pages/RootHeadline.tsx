function RootHeadline(props: {
  firstH1: string;
  secondH1: string;
  firstSubtitle?: string;
  secondSubtitle?: string;
}) {
  return (
    <>
      <h2 className="home-text10 Heading1">
        <span>
          {props.firstH1}
          <br />
        </span>
        <span className="home-text12 Heading2">{props.secondH1}</span>
      </h2>
      {(props.firstSubtitle || props.secondSubtitle) && (
        <span className="home-text14">
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
