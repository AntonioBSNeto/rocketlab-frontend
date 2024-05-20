import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const stepActived = "bg-white text-[#F80032]";
const stepDesactivated = "text-white/60 border border-white/60"

interface PaymentHeaderProps {
  step: string;
}

export default function PaymentHeader({ step }: PaymentHeaderProps) {
  const navigate = useNavigate();

  return (
    <Box className="grow">
      <AppBar position="static" sx={{ backgroundColor: '#F80032', height: '80px' }}>
        <Toolbar sx={{ flexGrow: 1, display: 'flex', justifyContent: { xs: 'flex-end', sm: 'space-between' } }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '32px', }}
            onClick={() => navigate('/')}
            className='hover:cursor-pointer'
          >
            <u>LOGO</u>
          </Typography>

          <Box sx={{ display: 'flex flex-col', justifyContent: 'flex-end' }}>
            <Box className="grid" sx={{ gridTemplateColumns: { xs: 'auto 150px auto', sm: 'auto 300px auto' } }}>
              <div>
                <div className={`${stepActived} rounded-full w-6 text-center mx-auto`}>1</div>
                <div>entrega</div>
              </div>
              <div className={`flex mt-[12px] ml-[-15px] h-[2px] flex-1 max-sm:w-[193.6px] w-[343.6px] ${(step == 'payment') ? '!bg-white' : '!bg-white/60'} `}></div>
              <div>
                <div className={`${(step == 'payment') ? stepActived : stepDesactivated} rounded-full w-6 text-center mx-auto`}>2</div>
                <div className={`${(step == 'payment') ? '' : 'text-white/60'}`}>pagamento</div>
              </div>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}