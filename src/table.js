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
import Icon from '@material-ui/core/Icon';

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
    const [participants, setParticipants] = React.useState([]);
    const [blueKills, setBlueKills] = React.useState(0);
    const [redKills, setRedKills] = React.useState(0);
    const [blueGold, setBlueGold] = React.useState(0);
    const [redGold, setRedGold] = React.useState(0);



    const getData = async (date) => {
        if (props.match !== '') {
            let date = new Date();
            date = date - 20000;
            let date2 = new Date(date).toISOString();
            date2 = date2.split('.')[0] + "Z";
            date2 = date2.replaceAt(18, '0');

            const data = await fetch(`https://feed.lolesports.com/livestats/v1/details/${props.match}?startingTime=${date2}`);

            const wind = await fetch(`https://feed.lolesports.com/livestats/v1/window/${props.match}?startingTime=${date2}`)
            const resp = await wind.json();
            console.log(resp.frames[resp.frames.length - 1]);
            const frame = resp.frames[resp.frames.length - 1];
            let blue = 0;
            let red = 0;
            let blueG = 0;
            let redG = 0;
            // participants.map((element, index) => {
            //     if (index < 5) {
            //         blue += element.kills;
            //         blueG += element.totalGoldEarned;
            //     }
            //     else {
            //         red += element.kills;
            //         redG += element.totalGoldEarned;
            //     }
            // })
            setData(frame);
            console.log(frame)
            const part = [...frame.blueTeam.participants, ...frame.redTeam.participants]
            setParticipants(part);
        }



    }


    React.useEffect(() => {

        getData();

    }, [props.match])

    console.log(data);
    return (
        <>
            {data !== [] ?
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h1>Score: {data.blueTeam.totalKills + " x " + data.redTeam.totalKills}</h1>
                    <h1>Gold: {data.blueTeam.totalGold + " x " + data.redTeam.totalGold}</h1>
                    <h1>Dragões: {data.blueTeam.dragons.length + ' x ' + data.redTeam.dragons.length}</h1>
                    <h1>Barões: {data.blueTeam.barons + ' x ' + data.redTeam.barons}</h1>
                    <h1>Torres: {data.blueTeam.towers + ' x ' + data.redTeam.towers}</h1>
                    <h1>Inibidores: {data.blueTeam.inhibitors + " x " + data.redTeam.inhibitors}</h1>
                    <Button style={{ height: 50, marginTop: 2, marginLeft: 10, backgroundColor: "pink" }} variant="contained" color="secondary" onClick={() => getData()}>
                        Atualizar
                    </Button>

                </div>
                :
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                    <Button style={{ height: 50, marginTop: 2, marginLeft: 10, backgroundColor: "pink" }} variant="contained" color="secondary" onClick={() => getData()}>
                        Atualizar
                    </Button>

                </div>
            }


            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Posição</TableCell>
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
                            participants.length !== 0 ?
                                participants.map((row, index) => {
                                    const color = (index >= 5) ? "#c72c3a" : "rgb(52,152,219)"

                                    return <TableRow style={{ backgroundColor: color }} key={index}>
                                        <TableCell style={{ color: "white" }} component="th" scope="row">

                                            <Icon>
                                                {index === 0 || index === 5 ?
                                                    <img height={20} alt="icone_form" className={classes.imageIcon} src={"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png"} />
                                                    : index === 1 || index === 6 ?
                                                        <img height={20} alt="icone_form" className={classes.imageIcon} src={"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png"} />
                                                        : index === 2 || index === 7 ?
                                                            <img height={20} alt="icone_form" className={classes.imageIcon} src={"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png"} />
                                                            : index === 3 || index === 8 ?
                                                                <img height={20} alt="icone_form" className={classes.imageIcon} src={"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png"} />
                                                                : index === 4 || index === 9 ?
                                                                    <img height={20} alt="icone_form" className={classes.imageIcon} src={"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png"} />
                                                                    : null
                                                }
                                            </Icon>
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