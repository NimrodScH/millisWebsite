import React, { useState, useEffect } from "react"
import "./SliderInProjectCard.css"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export default function SliderInProjectCard({ images }: { images: string[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    rtl: true,
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  useEffect(() => {
    if (loaded && instanceRef.current) {
      instanceRef.current.update()
    }
  }, [loaded])
  

  return (
    <>
     <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {images.map((img, idx) => (
            <div className="keen-slider__slide" key={idx}>
              <img src={img} alt={`Slide ${idx}`} className="slide-img" />
            </div>
          ))}
        </div>

        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={currentSlide === 0}
            />
            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>

      {loaded && instanceRef.current && (
        <div className="dots">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={"dot" + (currentSlide === idx ? " active" : "")}
            />
          ))}
        </div>
      )}
    </>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  
  return (
    <svg
      onClick={props.onClick}
      className={`arrowNew ${
        props.left ? "arrowNew--left" : "arrowNew--right"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left ? (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      ) : (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}
