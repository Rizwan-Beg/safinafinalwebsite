// import { Button } from "@/ui/button";
// import { Input } from "@/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/ui/dropdown-menu";
// import { Avatar, AvatarFallback } from "@/ui/avatar";
// import { Badge } from "@/ui/badge";
// import { SidebarTrigger } from "@/ui/sidebar";
// import { useAuthStore, useUIStore } from "@/store";
// import { Bell, Search, User, Settings, LogOut, Sun, Moon } from "lucide-react";
// import { useState } from "react";

// export function Header() {
//   const { user, logout } = useAuthStore();
//   const { theme, setTheme } = useUIStore();
//   const [notifications] = useState(3); // Mock notification count

//   const handleThemeToggle = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
//       <div className="flex items-center justify-between h-full px-4">
//         {/* Left side - Sidebar trigger and search */}
//         <div className="flex items-center space-x-4 flex-1">
//           <SidebarTrigger className="text-foreground" />

//           <div className="relative max-w-md w-full">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//             <Input
//               placeholder="Search products, orders, customers..."
//               className="pl-10 bg-muted/30 border-border focus:bg-background"
//             />
//           </div>
//         </div>

//         {/* Right side - Actions and user menu */}
//         <div className="flex items-center space-x-3">
//           {/* Theme toggle */}
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={handleThemeToggle}
//             className="text-foreground hover:bg-muted"
//           >
//             {theme === "light" ? (
//               <Moon className="w-4 h-4" />
//             ) : (
//               <Sun className="w-4 h-4" />
//             )}
//           </Button>

//           {/* Notifications */}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="relative text-foreground hover:bg-muted"
//           >
//             <Bell className="w-4 h-4" />
//             {notifications > 0 && (
//               <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-primary hover:bg-primary">
//                 {notifications}
//               </Badge>
//             )}
//           </Button>

//           {/* User menu */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                 <Avatar className="h-8 w-8">
//                   <AvatarFallback className="bg-primary text-primary-foreground">
//                     {user?.name
//                       ?.split(" ")
//                       .map((n) => n[0])
//                       .join("") || "U"}
//                   </AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent
//               className="w-56 bg-popover border-border"
//               align="end"
//               forceMount
//             >
//               <DropdownMenuLabel className="font-normal">
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium leading-none text-popover-foreground">
//                     {user?.name || "User"}
//                   </p>
//                   <p className="text-xs leading-none text-muted-foreground">
//                     {user?.email || "user@example.com"}
//                   </p>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
//                 <User className="mr-2 h-4 w-4" />
//                 <span>Profile</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
//                 <Settings className="mr-2 h-4 w-4" />
//                 <span>Settings</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 onClick={handleLogout}
//                 className="text-destructive focus:text-destructive hover:bg-destructive/10"
//               >
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// }
