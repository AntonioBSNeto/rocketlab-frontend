import { Box, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface StarsProps {
  rate: number;
  amount: number;
}

const renderStars = (rate: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rate) {
      stars.push(<StarIcon key={i} style={{ color: '#F2C832', fontSize: '14px' }} />);
    } else if (i === Math.ceil(rate) && rate % 1 !== 0) {
      stars.push(<StarHalfOutlinedIcon key={i} style={{ color: '#F2C832', fontSize: '14px' }} />);
    } else {
      stars.push(<StarBorderIcon key={i} style={{ color: '#CCCCCC', fontSize: '14px' }} />);
    }
  }
  return stars;
};

export default function Stars({ rate, amount, }: StarsProps) {
  
  return (
    <Box className="flex gap-x-1 items-center">
      {renderStars(rate)}
      <Typography className="!font-bold !text-xs">{amount}</Typography>
    </Box>
  )
}