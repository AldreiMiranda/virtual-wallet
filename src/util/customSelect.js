import React from 'react';
import { NativeSelect, InputBase } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';

const BootstrapInput = withStyles(theme => ({
    root: {
        
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover, &:active': {
            borderColor: '#0f1628',
        },
        '&:focus': {
            borderRadius: 4,
            borderColor: '#3D51B1',
            border: '2px solid',
            color: '#000'
        },

    },
}))(InputBase);

export default props => {
    const { error } = props
    
    return (
        <NativeSelect
            
            input={<BootstrapInput inputProps={{ style: { borderColor: error ? 'red' : '' } }}/>}
            {...props}
        >
            {props.children}
        </NativeSelect>
    )
}