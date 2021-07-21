import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useSwipeable } from 'react-swipeable'
// styles
import './style.scss'

// Carousel Item component
export const CarouselItem = ({ className, children }) => {
  return <div className={classnames('carousel-item container', className)}>{children}</div>
}
CarouselItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
}

// Carousel component
const Carousel = ({ children }) => {
  // device width
  const deviceWidth = window.innerWidth

  // Current slide index to display
  const [activeIndex, setActiveIndex] = useState(0)

  // auto play slides
  const [autoPlay, setAutoPlay] = useState(true)

  // carousel container ref
  const carouselContainerRef = useRef()
  const setCarouselContainerTransform = useCallback(
    (translateX) => {
      if (carouselContainerRef.current) carouselContainerRef.current.style.transform = `translateX(-${translateX}px)`
    },
    [carouselContainerRef],
  )

  // move to next slide - direction = left, right
  const moveNextSlide = useCallback(
    (direction) => {
      setActiveIndex((prevActiveIndex) => {
        const totalSlides = React.Children.count(children)

        // Caculate next active index depends on direction
        let nextActiveIndex
        if (direction === 'right') {
          // Set index = 0 when current index is the last slide
          nextActiveIndex = prevActiveIndex === totalSlides - 1 ? 0 : prevActiveIndex + 1
        } else if (direction === 'left') {
          // Set index = total slides when current index is the first slide
          nextActiveIndex = prevActiveIndex === 0 ? totalSlides - 1 : prevActiveIndex - 1
        }

        // Set carousel container transform
        setCarouselContainerTransform(deviceWidth * nextActiveIndex)

        // Return next active index
        return nextActiveIndex
      })
    },
    [setActiveIndex, children, setCarouselContainerTransform, deviceWidth],
  )

  // Swipe actions handler
  const swipeHandler = useSwipeable({
    delta: 10,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,

    // Handle on swipe start - disable autoplay
    onSwipeStart: () => setAutoPlay(false),

    // Handle on Swiping
    onSwiping: (event) => {
      const { deltaX } = event
      setCarouselContainerTransform(deviceWidth * activeIndex - deltaX)
    },

    // Handle after swiped
    onSwiped: (event) => {
      const { deltaX } = event

      // Turn on autoplay
      setAutoPlay(true)

      // Only move to next slide when user has swiped a distance greater than 1/4 device width
      if (Math.abs(deltaX) < deviceWidth / 4) {
        setCarouselContainerTransform(deviceWidth * activeIndex)
        return
      }

      // Move to next slide depends on swipe direction
      const swipeDirection = event.dir // Left, Right
      if (swipeDirection === 'Left') {
        moveNextSlide('right')
      } else if (swipeDirection === 'Right') {
        moveNextSlide('left')
      }
    },
  })

  // Auto slide to the next CarouselItem every 5s
  useEffect(() => {
    let autoPlayInterval

    // Create an autoplay interval
    if (autoPlay) {
      autoPlayInterval = setInterval(() => moveNextSlide('right'), 5000)
    }

    // Clear autoplay interval
    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval)
        autoPlayInterval = null
      }
    }
  }, [autoPlay])

  return (
    <div {...swipeHandler} className="carousel">
      {/* Carousel children items */}
      <div
        ref={carouselContainerRef}
        className="carousel__items"
        style={{ transition: autoPlay ? 'transform 0.3s' : 'none' }}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child)
        })}
      </div>

      {/* Indicators, light gray when inactive, dark gray when active */}
      <div className="carousel__indicators">
        {React.Children.map(children, (child, index) => {
          return (
            <div className={`${index === activeIndex ? 'active' : ''}`}>
              <p className="text-dcdcdc">⬤</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Carousel.propTypes = {
  children: PropTypes.array.isRequired,
}

export default Carousel
