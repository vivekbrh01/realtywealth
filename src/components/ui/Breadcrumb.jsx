import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeLabels = {
    '/': 'Dashboard',
    '/client-dashboard': 'Client Dashboard',
    '/client-onboarding': 'Client Onboarding',
    '/property-management': 'Property Management',
    '/property-details': 'Property Details',
    '/employee-management': 'Employee Management',
    '/login': 'Login'
  };

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = routeLabels?.[currentPath] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      breadcrumbs?.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) return null;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground py-3" aria-label="Breadcrumb">
      {breadcrumbs?.map((item, index) => (
        <React.Fragment key={item?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {index === breadcrumbs?.length - 1 ? (
            <span className="text-foreground font-medium" aria-current="page">
              {item?.label}
            </span>
          ) : (
            <button
              onClick={() => handleNavigation(item?.path)}
              className="hover:text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1 py-0.5"
            >
              {item?.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;