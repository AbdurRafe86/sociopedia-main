import { Typography, useTheme, Link, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="700" sx={{ letterSpacing: "-0.5px" }}>
          Sponsored
        </Typography>
        <Typography color={medium} fontWeight="500" sx={{ cursor: "pointer", "&:hover": { color: main } }}>
          Create Ad
        </Typography>
      </FlexBetween>
      <Box
        component="img"
        width="100%"
        height="auto"
        alt="advert"
        src={`https://i.ibb.co/sQM7TMB/info4.jpg`}
        sx={{ 
          borderRadius: "0.75rem", 
          margin: "1rem 0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.02)" }
        }}
      />
      <FlexBetween>
        <Typography color={main} fontWeight="700">MikaCosmetics</Typography>
        <Link 
          href="#" 
          underline="hover" 
          color={medium} 
          sx={{ fontSize: "0.85rem", fontWeight: "500" }}
        >
          mikacosmetics.com
        </Link>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0" sx={{ fontSize: "0.9rem", lineHeight: "1.4" }}>
        Your pathway to stunning and immaculate beauty. Experience the glow with our 
        new exfoliating skin treatment that leaves you shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
