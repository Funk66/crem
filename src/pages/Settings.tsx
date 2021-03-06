import {
  Card,
  Grid,
} from "@material-ui/core";

export const Account = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card></Card>
      </Grid>
      <Grid item xs={12} md={8}></Grid>
    </Grid>
  );
};

export default Account;
