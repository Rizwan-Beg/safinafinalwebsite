import Link from "next/link";;
import { useUIStore } from "../store";
import { cn } from "../lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "../ui/sidebar";
import {
  LayoutDashboard,
  Package,
  Folder,
  Users,
  ShoppingCart,
  FileText,
  MessageSquare,
  Settings,
  User,
  Bell,
  Globe,
  Mail,
  MessageCircle,
  Calendar,
  Heart,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAuthStore } from "../store";

const navigationItems = [
  {
    title: "Overview",
    items: [{ title: "Dashboard", url: "/", icon: LayoutDashboard }],
  },
  {
    title: "Catalog",
    items: [
      { title: "Products", url: "/products", icon: Package },
      { title: "Categories", url: "/categories", icon: Folder },
    ],
  },
  {
    title: "Sales",
    items: [
      { title: "Orders", url: "/orders", icon: ShoppingCart },
      { title: "Customers", url: "/customers", icon: Users },
      { title: "Custom Requests", url: "/custom-requests", icon: FileText },
      { title: "Customer Favorites", url: "/customer-favorites", icon: Heart },
    ],
  },
  {
    title: "Communication",
    items: [
      { title: "Mail Inbox", url: "/mail-inbox", icon: Mail },
      { title: "Chat", url: "/chat", icon: MessageCircle },
      { title: "Messages", url: "/messages", icon: MessageSquare },
      { title: "International", url: "/international", icon: Globe },
    ],
  },
  {
    title: "Schedule",
    items: [
      { title: "Meeting Schedule", url: "/meeting-schedule", icon: Calendar },
    ],
  },
  {
    title: "System",
    items: [{ title: "Settings", url: "/settings", icon: Settings }],
  },
];

export function AppSidebar() {
  const { open: sidebarOpen } = useSidebar();
  const { user } = useAuthStore();
  const collapsed = !sidebarOpen;

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
      isActive &&
        "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
    );

  return (
    <Sidebar className={cn(collapsed ? "w-16" : "w-64")} collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
            SC
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">
                SAFINA
              </h2>
              <p className="text-xs text-sidebar-foreground/70">CARPETS</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        {navigationItems.map((group) => (
          <SidebarGroup key={group.title}>
            {!collapsed && (
              <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs font-medium px-4 py-2">
                {group.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className={getNavClass({ isActive: false }) as string}>
                        <item.icon className="w-5 h-5 shrink-0" />
                        {!collapsed && (
                          <span className="ml-3">{item.title}</span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "U"}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {user?.role || "Admin"}
              </p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
