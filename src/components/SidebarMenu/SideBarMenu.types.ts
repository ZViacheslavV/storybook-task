export interface MenuItem {
  id: string;
  label: string;
  onClick?: () => void;
  subItems?: MenuItem[];
}
