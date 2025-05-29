import React, { useEffect } from 'react'

const PreloadManager = () => {
  useEffect(() => {
    // Preload Google Fonts
    const fontUrls = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
      'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap',
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap'
    ]

    fontUrls.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'style'
      link.href = url
      document.head.appendChild(link)
    })

    // Preload critical CSS animations
    const criticalStyles = `
      @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
      @keyframes glow { 0%, 100% { box-shadow: 0 0 5px var(--primary); } 50% { box-shadow: 0 0 20px var(--primary); } }
      @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
    `
    
    const styleSheet = document.createElement('style')
    styleSheet.textContent = criticalStyles
    document.head.appendChild(styleSheet)

    // Optimize scroll performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Update scroll-based animations here
          ticking = false
        })
        ticking = true
      }
    }

    // Throttled scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}

export default PreloadManager

// Performance optimization hook
export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Disable animations on low-end devices
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0s')
    }

    // Optimize for mobile devices
    if (window.innerWidth < 768) {
      document.documentElement.style.setProperty('--blur-amount', '5px')
    }

    // Battery API optimization (if supported)
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        if (battery.level < 0.2) {
          // Reduce animations when battery is low
          document.documentElement.classList.add('reduce-animations')
        }
      })
    }
  }, [])
}

// Intersection Observer hook for better performance
export const useIntersectionObserver = (callback, options = {}) => {
  const ref = React.useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    })

    const currentElement = ref.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [callback, options])

  return ref
}
