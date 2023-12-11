import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  url: string;
}

export default function ActionAreaCard({
  imgSrc,
  imgAlt,
  title,
  description,
  url,
}: Props) {
  const theme = useTheme();
  const openUrlInNewTab = () => {
    window.open(url, "_blank");
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <CardActionArea onClick={openUrlInNewTab} sx={{ height: 560 }}>
        <CardMedia
          component='img'
          height='200'
          image={imgSrc}
          alt={imgAlt}
          style={{ objectFit: "fill" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant='h6'
            textAlign={theme.direction === "ltr" ? "left" : "right"}
          >
            {title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            textAlign={theme.direction === "ltr" ? "left" : "right"}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
