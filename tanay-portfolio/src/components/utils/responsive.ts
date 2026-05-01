export const isMobile = () => typeof window !== 'undefined' ? window.innerWidth < 768 : false;
export const isTablet = () => typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false;
export const isDesktop = () => typeof window !== 'undefined' ? window.innerWidth >= 1024 : false;
