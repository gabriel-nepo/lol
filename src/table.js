import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

String.prototype.replaceAt = function (index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }

    return this.substring(0, index) + replacement + this.substring(index + 1);
}



export default function BasicTable(props) {
    const classes = useStyles();
    console.log(props.match);
    const [data, setData] = React.useState([]);

    const getData = async (date) => {
        if (props.match !== '') {
            let date = new Date();
            date = date - 20000;
            let date2 = new Date(date).toISOString();
            date2 = date2.split('.')[0] + "Z";
            date2 = date2.replaceAt(18, '0');

            const data = await fetch(`https://feed.lolesports.com/livestats/v1/details/${props.match}?startingTime=${date2}`);
            const resp = await data.json();
            console.log(resp);
            setData(resp.frames[resp.frames.length - 1]);
            console.log(date)
        }



    }


    React.useEffect(() => {

        getData();

    }, [props.match])

    console.log(data);
    return (
        <>
            <Button style={{ height: 50, marginTop: 2, marginLeft: 10, backgroundColor: "pink" }} variant="contained" color="secondary" onClick={() => getData()}>
                Atualizar
            </Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Jogador</TableCell>
                            <TableCell align="right">Level</TableCell>
                            <TableCell align="right">Eliminações</TableCell>
                            <TableCell align="right">Mortes</TableCell>
                            <TableCell align="right">Assistências</TableCell>
                            <TableCell align="right">Gold</TableCell>
                            <TableCell align="right">AMA</TableCell>
                            <TableCell align="right">CS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.length !== 0 ?
                                data.participants.map((row, index) => {
                                    const color = (index > 5) ? "#c72c3a" : "rgb(52,152,219)"

                                    return <TableRow style={{ backgroundColor: color }} key={index}>
                                        <TableCell style={{ color: "white" }} component="th" scope="row">
                                            {row.participantId}
                                        </TableCell>
                                        <TableCell style={{ color: "white" }} align="right">{row.level}</TableCell>
                                        <TableCell style={{ color: "white" }} align="right">{row.kills}</TableCell>
                                        <TableCell style={{ color: "white" }} align="right">{row.deaths}</TableCell>
                                        <TableCell style={{ color: "white" }} align="right">{row.assists}</TableCell>
                                        <TableCell style={{ color: "white" }} align="right">{row.totalGoldEarned}</TableCell>
                                        {
                                            row.deaths === 0 ?
                                                <TableCell style={{ color: "white" }} align="right">{(row.kills + row.assists).toFixed(1)}</TableCell>
                                                :
                                                <TableCell style={{ color: "white" }} align="right">{((row.kills + row.assists) / row.deaths).toFixed(1)}</TableCell>
                                        }

                                        <TableCell style={{ color: "white" }} align="right">{row.creepScore}</TableCell>
                                    </TableRow>
                                })
                                : "Não há dados "
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}