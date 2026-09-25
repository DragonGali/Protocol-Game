const path = require('path');

window.addEventListener('DOMContentLoaded', () => {
  // Get the base path where the app is running from
  const baseDir = path.dirname(__filename).replace(/\\/g, '/');
  const isDev = process.env.IS_DEV === "true";

  // Function to resolve image paths
  const fixImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      
      // Only modify relative paths (not data URIs or absolute URLs)
      if (src && !src.startsWith('data:') && !src.startsWith('http') && !src.startsWith('file://')) {
        if (!isDev) {
          // Remove leading slash if present
          const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
          const newSrc = `file://${baseDir}/../dist/${cleanSrc}`;
          
          img.setAttribute('src', newSrc);
          
          // Log if image fails to load (for debugging)
          img.addEventListener('error', () => {
            console.error(`Failed to load image: ${newSrc}`);
          });
        }
        // In dev mode, Vite's dev server handles it fine, so no change needed
      }
    });
  };

  // Run immediately
  fixImages();

  // Also run after short delays to catch dynamically added images
  setTimeout(fixImages, 100);
  setTimeout(fixImages, 500);
  setTimeout(fixImages, 1000);

  // Observe for dynamically added images
  const observer = new MutationObserver(() => {
    fixImages();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});