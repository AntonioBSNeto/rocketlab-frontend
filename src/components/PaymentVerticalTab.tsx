import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PixIcon from '../util/svg/Pix';
import BarCodeIcon from '../util/svg/BarCode';
import PixFilledIcon from '../util/svg/PixFilled';
import PixQrCodeIcon from '../util/svg/PixQrCode';
import { Button } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }} className='flex grow'>
          <Box className='flex grow h-auto'>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const copyPix = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1')
    }
  }

  const renderPixPayment = () => {
    return (
      <Box className='flex flex-col' sx={{ '& svg': { width: '24px' } }}>
        <div className='text-[#42464D] text-base font-bold flex gap-x-3 items-center'>
          <PixFilledIcon/>
          Pix
        </div>
        <p className='text-[#42464D] text-base'>Pagamento com Pix tem aprovação imediata. Não perca tempo!</p>
        <Box className='flex grow flex-col items-center mt-4' sx={{ '& svg': { width: '148px' } }}>
          <PixQrCodeIcon />
          <Button onClick={copyPix} className="!bg-[#F80032] !text-white grow !text-base hover:!bg-[#F20544] hover:brightness-90 !mt-auto max-h-11 !lowercase !rounded-none">
            copiar código Pix
          </Button>
        </Box>
        <div className='pl-5 mt-4'>
          <ol className='list-decimal max-sm:hidden'>
            <li>Abra o app do seu banco, vá até o ambiente Pix e escolha pagar com QR Code ou Pix Copia e Cola.</li>
            <li>Escaneie ou cole o código Pix. Confira as informações e finalize o pagamento.</li>
            <li>Prontinho! Após a aprovação do pagamento, seu pedido será concluído automaticamente.</li>
          </ol>
        </div>
      </Box>
    )
  }

  const renderBoletoPayment = () => {
    return (
      <Box className='flex flex-col' sx={{ '& svg': { width: '24px' } }}>
        <p className='font-bold'>veja como é simples pagar com boleto:</p>
        <div className='pl-4 mt-4'>
          <ol className='list-decimal'>
            <li>depois de fechar o pedido, imprima ou copie o número do boleto;</li>
            <li>pague no seu banco ou pela internet;</li>
            <li>o prazo de validade do boleto é de 1 dia útil.</li>
          </ol>
        </div>
      </Box>
    )
  }

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'auto' }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', minWidth: '120px' }}
        className='max-sm:!hidden'
      >
        <Tab label="Pix" icon={<PixIcon />} iconPosition='start' {...a11yProps(0)} sx={{ '& svg': { width: '24px', marginRight: '6px' } }} />
        <Tab label="Boleto" icon={<BarCodeIcon />} iconPosition='start' {...a11yProps(1)} sx={{ '& svg': { width: '24px', marginRight: '6px' } }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {renderPixPayment()}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {renderBoletoPayment()}
      </TabPanel>
    </Box>
  );
}
