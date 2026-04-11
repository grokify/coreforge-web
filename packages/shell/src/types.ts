import type { ReactNode } from 'react';

/**
 * Navigation item
 */
export interface NavItem {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Display label
   */
  label: string;

  /**
   * Navigation path
   */
  href: string;

  /**
   * Icon component or element
   */
  icon?: ReactNode;

  /**
   * Badge content (e.g., notification count)
   */
  badge?: string | number;

  /**
   * Whether this item is active
   */
  isActive?: boolean;

  /**
   * Child navigation items
   */
  children?: NavItem[];

  /**
   * Required roles to see this item
   */
  roles?: string[];

  /**
   * Whether to open in new tab
   */
  external?: boolean;
}

/**
 * Navigation section (group of items)
 */
export interface NavSection {
  /**
   * Section title (optional)
   */
  title?: string;

  /**
   * Navigation items in this section
   */
  items: NavItem[];
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  /**
   * Display label
   */
  label: string;

  /**
   * Navigation path (omit for current page)
   */
  href?: string;

  /**
   * Icon component
   */
  icon?: ReactNode;
}

/**
 * User action in menu
 */
export interface UserAction {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Display label
   */
  label: string;

  /**
   * Icon component
   */
  icon?: ReactNode;

  /**
   * Action handler
   */
  onClick?: () => void;

  /**
   * Navigation path (alternative to onClick)
   */
  href?: string;

  /**
   * Whether this is a destructive action
   */
  destructive?: boolean;
}

/**
 * App shell configuration
 */
export interface AppShellConfig {
  /**
   * Application name
   */
  appName: string;

  /**
   * Application logo (image URL or component)
   */
  logo?: ReactNode;

  /**
   * Collapsed logo (for sidebar collapsed state)
   */
  logoCollapsed?: ReactNode;

  /**
   * Navigation items for sidebar
   */
  navigation?: NavSection[];

  /**
   * User menu actions
   */
  userActions?: UserAction[];

  /**
   * Whether sidebar is collapsible
   */
  sidebarCollapsible?: boolean;

  /**
   * Default collapsed state
   */
  defaultCollapsed?: boolean;

  /**
   * Whether to show organization switcher
   */
  showOrgSwitcher?: boolean;

  /**
   * Custom navigation handler (for SPA routing)
   */
  onNavigate?: (href: string) => void;

  /**
   * Callback when sidebar collapse state changes
   */
  onCollapseChange?: (collapsed: boolean) => void;
}

/**
 * App shell props
 */
export interface AppShellProps extends AppShellConfig {
  children: ReactNode;
}

/**
 * Sidebar props
 */
export interface SidebarProps {
  /**
   * Navigation sections
   */
  navigation: NavSection[];

  /**
   * Whether sidebar is collapsed
   */
  isCollapsed: boolean;

  /**
   * Toggle collapsed state
   */
  onToggleCollapse?: () => void;

  /**
   * Application logo
   */
  logo?: ReactNode;

  /**
   * Collapsed logo
   */
  logoCollapsed?: ReactNode;

  /**
   * Custom navigation handler
   */
  onNavigate?: (href: string) => void;

  /**
   * Current path (for active state)
   */
  currentPath?: string;
}

/**
 * Navbar props
 */
export interface NavbarProps {
  /**
   * Whether to show org switcher
   */
  showOrgSwitcher?: boolean;

  /**
   * User menu actions
   */
  userActions?: UserAction[];

  /**
   * Breadcrumb items
   */
  breadcrumbs?: BreadcrumbItem[];

  /**
   * Toggle sidebar callback
   */
  onToggleSidebar?: () => void;

  /**
   * Whether sidebar is visible (for mobile)
   */
  sidebarVisible?: boolean;

  /**
   * Custom navigation handler
   */
  onNavigate?: (href: string) => void;
}

/**
 * Org switcher props
 */
export interface OrgSwitcherProps {
  /**
   * Compact mode (icon only)
   */
  compact?: boolean;

  /**
   * Custom navigation handler
   */
  onNavigate?: (href: string) => void;
}

/**
 * User menu props
 */
export interface UserMenuProps {
  /**
   * Menu actions
   */
  actions?: UserAction[];

  /**
   * Custom navigation handler
   */
  onNavigate?: (href: string) => void;
}

/**
 * Breadcrumbs props
 */
export interface BreadcrumbsProps {
  /**
   * Breadcrumb items
   */
  items: BreadcrumbItem[];

  /**
   * Custom navigation handler
   */
  onNavigate?: (href: string) => void;

  /**
   * Separator character/element
   */
  separator?: ReactNode;

  /**
   * Maximum items to show (rest collapsed)
   */
  maxItems?: number;
}

/**
 * Shell context value
 */
export interface ShellContextValue {
  /**
   * Whether sidebar is collapsed
   */
  sidebarCollapsed: boolean;

  /**
   * Toggle sidebar collapsed state
   */
  toggleSidebar: () => void;

  /**
   * Set sidebar collapsed state
   */
  setSidebarCollapsed: (collapsed: boolean) => void;

  /**
   * Whether sidebar is visible (mobile)
   */
  sidebarVisible: boolean;

  /**
   * Toggle sidebar visibility (mobile)
   */
  toggleSidebarVisible: () => void;

  /**
   * Current path
   */
  currentPath: string;

  /**
   * Set current path
   */
  setCurrentPath: (path: string) => void;

  /**
   * Navigate to path
   */
  navigate: (href: string) => void;
}
