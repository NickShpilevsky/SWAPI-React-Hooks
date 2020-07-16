import React, {useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Paper, Typography} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '25rem',
    height: '50rem',
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
  const [name, setName] = useState('Title');
  const [simpleInfo, setSimpleInfo] = useState({name: '', gender: ''});
  const [compositeInfo, setCompositeInfo] = useState({films: [], vehicles: [], homeworld: ['']});

  useEffect(() => {
    setName(props.info ? props.info.name : 'Title');
    setSimpleInfo({
      gender: props.info ? props.info.gender : '',
      height: props.info ? props.info.height : '',
      hair_color: props.info ? props.info.hair_color : '',
      skin_color: props.info ? props.info.skin_color : '',
      eye_color: props.info ? props.info.eye_color : '',
      birth_year: props.info ? props.info.birth_year : '',
    });
  }, [props.info]);

  useEffect(() => {
    async function fetchData() {
      let data = {
        homeworld: [],
        vehicles: [],
        films: [],
      };
      if (props.info) {
        const homeworld = await axios(props.info.homeworld.replace('http', 'https'));
        data.homeworld.push(homeworld.data.name);

        for (let item in props.info.vehicles) {
          let vehicle = {};
          const vehicles = await axios(props.info.vehicles[item].replace('http', 'https'));
          vehicle.name = vehicles.data.name;
          vehicle.model = vehicles.data.model;
          data.vehicles.push(vehicle);
        }

        for (let item in props.info.films) {
          const films = await axios(props.info.films[item].replace('http', 'https'));
          data.films.push(films.data.title);
        }
        return data;
      }
    }

    fetchData().then((data) => {
      setCompositeInfo(data);
    });
  }, [props.info]);

  const classes = useStyles();
  return (
    <Paper elevation={5} className={classes.paper}>
      <h1 className={classes.title}>{name}</h1>
      <div className={classes.row}>
        <div>
          {
            Object.keys(simpleInfo).map(item => (
              <p key={item} className={classes.itemTitle}>{item}</p>
            ))
          }
          <p className={classes.itemTitle}>home world</p>
        </div>
        <div>
          {
            Object.keys(simpleInfo).map(item => (
              <p key={item}>{simpleInfo[item]}</p>
            ))
          }
          <p>{compositeInfo ? compositeInfo.homeworld : ''}</p>
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
                  compositeInfo ? compositeInfo.vehicles.map(item => (
                    <div key={item.name} className={[classes.row]}>
                      <div>
                        <p className={classes.itemTitle}>name</p>
                        <p className={classes.itemTitle}>model</p>
                      </div>
                      <div>
                        <p>{compositeInfo.vehicles.length ? item.name : ''}</p>
                        <p>{compositeInfo.vehicles.length ? item.model : ''}</p>
                      </div>
                    </div>
                  )) : (<p>None</p>)
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
              {
                compositeInfo ? compositeInfo.films.map(item => (
                  <p key={item} className={classes.itemTitle}>{item}</p>
                )) : ''
              }
          </div>
        </AccordionDetails>
      </Accordion>
    </Paper>
    )
};

export default Info;