import { withStyles } from '@material-ui/core/styles';

const styles = (theme: any) => ({
  '@global': {
    '::-webkit-scrollbar': {
      width: '9px;',
    },
    '::-webkit-scrollbar-track': {
      background: '#dfdfe6',
      'border-radius': '25px',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#737375',
      'border-radius': '25px',
    },
    '::-webkit-scrollbar-thumb:hover ': {
      background: '#909096',
    },
  },
});

function MyCssBaseline() {
  return null;
}

export default withStyles(styles)(MyCssBaseline);
