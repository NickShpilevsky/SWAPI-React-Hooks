import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Paper, Typography} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '25rem',
    height: '640px',
    padding: theme.spacing(1, 1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white,
    marginLeft: theme.spacing(2),
  },

  title: {
    marginBottom: '1rem',
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },

  itemTitle: {
    fontWeight: 500,
    marginRight: '1rem',
  },

  accordion: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white,
  },

  accordionDetails: {
    display: 'flex',
    flexDirection: 'column',
  }
}));

const Info = props => {
  const { info } = props;
  const [name, setName] = useState('Information');
  const [simpleInfo, setSimpleInfo] = useState(['gender', 'height', 'hair color', 'skin color', 'eye color', 'birth year', 'home world']);
  const [compositeInfo, setCompositeInfo] = useState({films: [], vehicles: []});

  async function fetchData() {
    let [data, vehicle, films] = [{vehicles: [], films: []}, ];
    for (let item in info.vehicles) {
      vehicle = await axios(info.vehicles[item].replace('http', 'https'));
      data.vehicles.push({name: vehicle.data.name, model: vehicle.data.model});
    }
    for (let item in info.films) {
      films = await axios(info.films[item].replace('http', 'https'));
      data.films.push(films.data.title);
    }
    return data;
  }

  useEffect(() => {
    if (info) {
      const { name, gender, height, hair_color, skin_color, eye_color, birth_year, homeworld } = info;
      setName(name);
      setSimpleInfo({
        gender: gender,
        height: height,
        'hair color': hair_color,
        'skin color': skin_color,
        'eye color': eye_color,
        'birth year': birth_year,
        'home world': homeworld,
      });
    }
  }, [info]);

  useEffect(() => {
    if (info) {
      fetchData().then((data) => {
        setCompositeInfo(data);
      });
    }
  }, [info]);

  const printData = (array, className) => {
    let key = 1;
    if (array) return (
      array.map(item => (
        <p key={key++} className={className}>{item}</p>
      ))
    )
  };

  const classes = useStyles();
  return (
    <Paper elevation={5} className={classes.paper}>
      <h1 className={classes.title}>{name}</h1>
      <div className={classes.row}>
        <div className={classes.itemTitle}>
          {!Array.isArray(simpleInfo) ? printData(Object.keys(simpleInfo)) : printData(Object.values(simpleInfo))}
        </div>
        <div>
          {!Array.isArray(simpleInfo) ? printData(Object.values(simpleInfo)) : null}
        </div>
      </div>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.itemTitle}>Vehicles</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          {
            compositeInfo.vehicles.length ? compositeInfo.vehicles.map(item => (
              <div key={item.name} className={[classes.row]}>
                <div>
                  <p className={classes.itemTitle}>name</p>
                  <p className={classes.itemTitle}>model</p>
                </div>
                <div>
                  <p>{compositeInfo.vehicles.length ? item.name : ''}</p>
                  <p>{compositeInfo.vehicles.length ? item.model : ''}</p>
                </div>
              </div>))
              : (<p>None</p>)
          }
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.itemTitle}>Films</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {compositeInfo.films.length ? printData(compositeInfo.films, classes.itemTitle) : null}
          </div>
        </AccordionDetails>
      </Accordion>
    </Paper>
    )
};

export default Info;