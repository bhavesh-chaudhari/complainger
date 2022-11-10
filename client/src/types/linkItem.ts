export interface LinkItemType {
  id: number;
  name: string;
  path: string;
  icon: React.ReactNode;
  type?: string;
}

export interface SidebarLinkType {
  complaintsCount?: number;
  allComplaintsCount?: number;
  item: LinkItemType;
}
