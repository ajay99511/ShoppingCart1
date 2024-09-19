import { Typography, Grid } from '@mui/material';
import BasketTable from '../basket/BasketTable';
import { useAppSelector } from '../../app/store/ConfigureStore';
import BasketSummary from '../basket/BasketSummary';

export default function Review() {
  const {basket} = useAppSelector(state=>state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket && <BasketTable items={basket.items} isBasket={false}/>}
      <Grid container justifyContent="flex-end">
    <Grid item xs={6}>
      <Grid item xs={12}>
      <BasketSummary />
      </Grid>
    </Grid>
      </Grid>
    </>
  );
}
