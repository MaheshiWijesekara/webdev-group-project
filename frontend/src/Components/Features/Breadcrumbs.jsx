// Components/Breadcrumbs/Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Breadcrumbs = ({ 
  customTitle, 
  backgroundColor = '#F9F7F2',
  paddingTop = '5px'
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter(x => x);

  const getBreadcrumbs = () => {
    // Always start with Home
    const items = [{ name: 'Home', path: '/', isActive: false }];

    // If we're on product page
    if (pathnames[0] === 'product' && pathnames[1] && /^\d+$/.test(pathnames[1])) {
      items.push({ name: 'Shop All', path: '/shop', isActive: false });
      items.push({ name: customTitle || `Product #${pathnames[1]}`, path: location.pathname, isActive: true });
      return items;
    }

    // If we're on checkout page
    if (pathnames[0] === 'checkout') {
      items.push({ name: 'Cart', path: '/cart', isActive: false });
      items.push({ name: 'Checkout', path: '/checkout', isActive: true });
      return items;
    }

    // For all other pages, build from path
    const routeNames = {
      'shop': 'Shop All',
      'about': 'About',
      'blog': 'Blog',
      'contact': 'Contact',
      'cart': 'Cart',
      'wishlist': 'Wishlist',
      'profile': 'My Account',
      'stores': 'Stores'
    };

    let currentPath = '';
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathnames.length - 1;
      
      // Skip if it's a product ID (already handled above)
      if (/^\d+$/.test(segment) && pathnames[0] === 'product') return;
      
      let name = routeNames[segment] || segment;
      name = name.charAt(0).toUpperCase() + name.slice(1);
      
      items.push({ name, path: currentPath, isActive: isLast });
    });

    // If only Home exists (we're on home page), make it active
    if (items.length === 1) {
      items[0].isActive = true;
    }

    return items;
  };

  const breadcrumbs = getBreadcrumbs();

  // Handle navigation with proper click
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div 
      className="breadcrumbs-wrapper" 
      style={{ 
        backgroundColor: backgroundColor,
        paddingTop: paddingTop,
      }}
    >
      <div className="container" style={{ padding: '4px 15px' }}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0" style={{ 
            fontSize: '0.8rem',
            fontWeight: '500',
            margin: 0,
            padding: '2px 0'
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
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => {
                      // Prevent default and use navigate for smooth routing
                      e.preventDefault();
                      navigate(item.path);
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