import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Firebase from '../../Firebase';
import moment from 'moment';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  timelineTime: {
    flex: '0.4',
    width: '75px',
    padding: 0
  },
  timelineWrapper: {
    width: '100%',
    height: 400,
    overflowX: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: '2rem',
    [theme.breakpoints.up('md')]: {
      width: 320,
      marginBottom: 0
    }
  }
}));

function OrderTimeline(props) {

  const classes = useStyles();
  const { order_id } = props;
  const [events, setEvents] = React.useState();

  useEffect(() => {
    Firebase.getTimeline(order_id, (doc) => {
      if (doc.exists) {
        // console.log(doc.data().events);
        setEvents(doc.data().events);
      } else {
        console.log("Document doesn't exist");
      };
    });
  }, [order_id]);

  return (
    <Paper elevation={5} className={classes.timelineWrapper}>
      <Timeline align="left">
        {events && events.map((event, i) => {
          let date = moment.unix(event.date / 1000).format("DD/MM/YYYY");
          let time = moment.unix(event.date / 1000).format("hh:mm A");
          return (
            <TimelineItem key={i}>
              <TimelineContent classes={{ root: classes.timelineTime }}>
                <Typography style={{ position: 'absolute', top: '8%', left: '-1%' }} color="textSecondary" variant="caption">{date}</Typography>
                <Typography style={{ position: 'absolute', top: '35%', left: '-1%', fontSize: '0.7rem' }} color="textSecondary" variant="caption">{time}</Typography>
              </TimelineContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineOppositeContent>
                <Typography align="left" variant="subtitle2" style={{ fontSize: '0.75rem' }}>{event.text}</Typography>
              </TimelineOppositeContent>
            </TimelineItem>
          )
        })}
      </Timeline>
    </Paper>
  );
};

export default OrderTimeline;