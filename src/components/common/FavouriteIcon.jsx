import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/FavoriteOutlined";
import Tooltip from "@mui/material/Tooltip";

const FavouriteIcon = () => {
  const [hover, setHover] = useState(false);

  return (
    <Tooltip title="Favourite" arrow>
      <FavoriteIcon
        style={{
          color: hover ? "yellow" : "white",
          cursor: "pointer",
          transition: "color 0.3s ease", // Smooth transition
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    </Tooltip>
  );
};

export default FavouriteIcon;
