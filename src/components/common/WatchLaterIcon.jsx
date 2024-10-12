import { useState } from "react";
import TurnedInIcon from "@mui/icons-material/TurnedInOutlined";
import Tooltip from "@mui/material/Tooltip";

const WatchLaterIcon = () => {
  const [hover, setHover] = useState(false);

  return (
    <Tooltip title="Watch Later" arrow>
      <TurnedInIcon
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

export default WatchLaterIcon;
