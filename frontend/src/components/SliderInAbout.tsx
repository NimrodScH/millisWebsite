import * as React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./sliderInAbout.css"

type KeyPoints = {
  title:string,
  text:string,
  imageAlt: string,
  imageSrc:string
}

export default function SliderInAbout({ keyPoints }: { keyPoints: KeyPoints[] }) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 5000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  return (
    <>
      
            <div id="head" className="home-agenda section-container">
        <div className="home-max-width4 max-content-container">
          <div className="home-heading-container3">
            <h1 className="home-text36 Heading2">
              <span>עובדות חשובות</span>
            </h1>
            <span className="home-text38">על המשרד וחייה של מילי</span>
          </div>
          <div className="home-events-container">
            <div className="home-column1">
              <div className="home-column-header1">
                <span className="home-text39">
                  <span>על מילי והמשרד</span>
                </span>
                <div className="home-line1"></div>
              </div>
              <div
  ref={keyPoints.length > 0 ? sliderRef : null} className="keen-slider">
  {keyPoints.slice(0, 3).map((point, idx) => (
    <div className="keen-slider__slide about-slide" key={idx}>
      <div className="about-slide-content">
        <div className="about-text">
          <h2>{point.title}</h2>
          <p>{point.text}</p>
        </div>
        <div className="about-image">
          <img src={point.imageSrc} alt={point.imageAlt} />
        </div>
      </div>
    </div>
  ))}
</div>
<div className="home-column2">
              <div className="home-column-header2">
                <span className="home-text41">
                  <span>ידע וערכי המשרד</span>
                </span>
                <div className="home-line2"></div>
              </div>
              {keyPoints.slice(3, 6).map((point, idx) => (
    <div className="keen-slider__slide about-slide" key={idx}>
      <div className="about-slide-content">
        <div className="about-text">
          <h2>{point.title}</h2>
          <p>{point.text}</p>
        </div>
        <div className="about-image">
          <img src={point.imageSrc} alt={point.imageAlt} />
        </div>
      </div>
    </div>
  ))}
            </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
