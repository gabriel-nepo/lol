import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



export default function ScheduleTable() {
    const classes = useStyles();
    const [data, setData] = React.useState([]);
    const getData = async () => {

        const data = await fetch('https://prod-relapi.ewp.gg/persisted/gw/getSchedule?hl=en-US&leagueId=98767991332355509', {
            headers: {
                'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'
            }
        });
        const resp = await data.json();
        let array = [];
        resp.data.schedule.events.map(element => {
            if (element.state !== 'completed') {
                array.push(element);
            }
        })
        setData(array);
        // setData(resp.frames[resp.frames.length - 1]);


    }

    React.useEffect(() => {
        getData();
    }, [])

    console.log(data);
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID partida</TableCell>
                        <TableCell>Confronto</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.length !== 0 ?
                            data.map((row, index) => {
                                let x = row.match.id;
                                return <TableRow key={index}>
                                    <TableCell>
                                        {x}
                                    </TableCell>
                                    <TableCell>{row.match.teams[0].code+" vs "+row.match.teams[1].code}</TableCell>
                                </TableRow>
                            })
                            : null
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}