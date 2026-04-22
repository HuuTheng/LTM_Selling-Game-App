import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons, // Thêm bộ này để có nhiều icon hệ thống đẹp hơn
} from "@expo/vector-icons";

const IconManager = ({
  name,
  size = 24,
  color = "black",
  type = "font-awesome",
}) => {
  switch (type) {
    case "font-awesome":
      return <FontAwesome name={name} size={size} color={color} />;
    case "ionicons":
      return <Ionicons name={name} size={size} color={color} />;
    case "material":
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    case "material-icons": // Thêm case mới
      return <MaterialIcons name={name} size={size} color={color} />;
    default:
      return <FontAwesome name={name} size={size} color={color} />;
  }
};

export const APP_ICONS = {
  HOME: { name: "home", type: "font-awesome" },
  LIBRARY: { name: "gamepad", type: "font-awesome" },
  SEARCH: { name: "search", type: "font-awesome" },
  NEWS: { name: "newspaper-o", type: "font-awesome" },
  MENU: { name: "bars", type: "font-awesome" },
  BACK: { name: "chevron-left", type: "font-awesome" },
  SETTINGS: { name: "cog", type: "font-awesome" },
  
  // --- ICON MỚI THÊM ---
  CART: { name: "shopping-cart", type: "material-icons" },
  SUN: { name: "wb-sunny", type: "material-icons" },    
  MOON: { name: "nightlight-round", type: "material-icons" },
  COMMUNITY: { name: "groups", type: "material-icons" },    
  EXIT: { name: "directions-run", type: "material-icons" }, 
};

export default IconManager;
