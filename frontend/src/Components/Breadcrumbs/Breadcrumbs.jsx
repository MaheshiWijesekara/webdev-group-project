// Components/Breadcrumbs/Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = ({ 
  customTitle, 
  backgroundColor = '#F9F7F2',
  paddingTop = '80px'
}) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Define breadcrumb structures for all pages
  const getBreadcrumbStructure = () => {
    const currentPath = location.pathname;

    // Product Details: Home / Shop All / Product Name
    if (pathnames.length >= 2 && pathnames[0] === 'product' && /^\d+$/.test(pathnames[1])) {
      return [
        { name: 'Home', path: '/' },
        { name: 'Shop All', path: '/shop' },
        { name: customTitle || `Product #${pathnames[1]}`, path: currentPath, isActive: true }
      ];
    }

    // Checkout: Home / Cart / Checkout
    if (currentPath === '/checkout') {
      return [
        { name: 'Home', path: '/' },
        { name: 'Cart', path: '/cart' },
        { name: 'Checkout', path: '/checkout', isActive: true }
      ];
    }

    // Cart: Home / Cart
    if (currentPath === '/cart') {
      return [
        { name: 'Home', path: '/' },
        { name: 'Cart', path: '/cart', isActive: true }
      ];
    }

    // Wishlist: Home / Wishlist
    if (currentPath === '/wishlist') {
      return [
        { name: 'Home', path: '/' },
        { name: 'Wishlist', path: '/wishlist', isActive: true }
      ];
    }

    // Profile: Home / My Account
    if (currentPath === '/profile') {
      return [
        { name: 'Home', path: '/' },
        { name: 'My Account', path: '/profile', isActive: true }
      ];
    }

    // Shop: Home / Shop All
    if (currentPath === '/shop') {
      return [
        { name: 'Home', path: '/' },
        { name: 'Shop All', path: '/shop', isActive: true }
      ];
    }

    // Other pages: Home / Page Name
    if (pathnames.length === 1) {
      const nameMap = {
        'about': 'About',
        'blog': 'Blog',
        'contact': 'Contact',
        'stores': 'Stores',
        'admin-virelle-hidden': 'Admin Panel'
      };
      
      const pageName = nameMap[pathnames[0]] || pathnames[0].charAt(0).toUpperCase() + pathnames[0].slice(1);
      
      return [
        { name: 'Home', path: '/' },
        { name: pageName, path: currentPath, isActive: true }
      ];
    }

    // Fallback: Build from path segments
    const structure = [];
    let currentPathBuild = '';
    
    pathnames.forEach((segment, index) => {
      currentPathBuild += `/${segment}`;
      const isLast = index === pathnames.length - 1;
      
      const nameMap = {
        'shop': 'Shop All',
        'about': 'About',
        'blog': 'Blog',
        'contact': 'Contact',
        'cart': 'Cart',
        'checkout': 'Checkout',
        'wishlist': 'Wishlist',
        'profile': 'My Account',
        'admin-virelle-hidden': 'Admin Panel',
        'stores': 'Stores',
        'product': 'Product'
      };
      
      let name = nameMap[segment] || segment;
      name = name.charAt(0).toUpperCase() + name.slice(1);
      
      structure.push({
        name: name,
        path: currentPathBuild,
        isActive: isLast
      });
    });
    
    return structure;
  };

  const breadcrumbs = getBreadcrumbStructure();

  return (
    <div 
      className="breadcrumbs-wrapper" 
      style={{ 
        backgroundColor: backgroundColor,
        paddingTop: paddingTop,
        borderBottom: '1px solid rgba(45, 64, 46, 0.1)'
      }}
    >
      <div className="container py-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0" style={{ 
            fontSize: '0.85rem',
            fontWeight: '500',
            margin: 0,
            padding: '8px 0'
          }}>
            {breadcrumbs.map((item, index) => (
              <li 
                key={index} 
                className={`breadcrumb-item ${item.isActive ? 'active' : ''}`}
              >
                {item.isActive ? (
                  <span style={{ 
                    color: '#2D402E',
                    fontWeight: '600'
                  }}>
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    to={item.path} 
                    className="text-decoration-none"
                    style={{ 
                      color: '#666',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#B4975A'}
                    onMouseLeave={(e) => e.target.style.color = '#666'}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;