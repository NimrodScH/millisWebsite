import './key-point.css'

const KeyPoint = (props:{index:number,
  title:string,
  text:string,
  imageAlt: string,
  imageSrc:string}) => {
  return (
    <div className="key-card-key-card">
      <img
        alt={props.imageAlt}
        width="200" height="200" src= {props.imageSrc}
        className="key-card-image"
      />
      <div className="key-card-vertical-line"></div>
      <div className="key-card-container">
        <span className="key-card-title">{props.title}</span>
        <span className="key-card-text">{props.text}</span>
      </div>
    </div>
  )
}


export default KeyPoint;
