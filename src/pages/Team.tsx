import { useEffect, KeyboardEvent, useState } from "react";
import {
  TextField,
  Box,
  Button,
  ButtonGroup,
  Avatar,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
  Chip,
} from "@material-ui/core";
import { ExpandMore, Send } from "@material-ui/icons";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { Rating as RatingType, getSkill, getSkills } from "../providers/Skills";

interface Profile {
  avatar: string;
  name: string;
  completion: number;
  skills: RatingType[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
    },
    summary: {},
    completion: {
      display: "flex",
      alignItems: "center",
      width: "40%",
    },
    avatar: {
      marginRight: "16px",
    },
  })
);

const profiles = [
  {
    avatar:
      "https://www.lensmen.ie/wp-content/uploads/2015/02/ality-LinkedIn-Photography-in-Dublin-Ireland.jpg",
    name: "Anton Müller",
    completion: 60,
    skills: [],
  },
  {
    avatar:
      "https://www.lensmen.ie/wp-content/uploads/2015/02/Profile-Portrait-Photographer-in-Dublin-Ireland..jpg",
    name: "Berta Schmidt",
    completion: 90,
    skills: [
      { skill: 2, rating: 2, status: 1 },
      { skill: 3, rating: 4, status: 1 },
      { skill: 12, rating: 3, status: 1 },
    ],
  },
  {
    avatar:
      "https://www.lensmen.ie/wp-content/uploads/2015/02/Headshot-Photographer-in-Dublin-Ireland..jpg",
    name: "Cäsar Schneider",
    completion: 100,
    skills: [],
  },
  {
    avatar:
      "https://www.lensmen.ie/wp-content/uploads/2015/02/Corporate-Portraiture-in-Dublin-Ireland.jpg",
    name: "Dora Fischer",
    completion: 30,
    skills: [{ skill: 9, rating: 4, status: 1 }],
  },
] as Profile[];

function LinearProgressWithLabel(props: any) {
  return (
    <Box display="flex" alignItems="center" style={{ width: "100%" }}>
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="determinate"
          {...props}
          color={props.value < 50 ? "secondary" : "primary"}
        />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const SkillRow = ({
  rating,
  onChange,
}: {
  rating: RatingType;
  onChange: any;
}) => {
  const [feedback, setFeedback] = useState(false);

  const handleFeedback = (event: KeyboardEvent) => {
    if (event.key === "Enter") onChange(rating.skill);
  };

  return (
    <TableRow key={rating.skill}>
      <TableCell>{getSkill(rating.skill).name}</TableCell>
      <TableCell align="center">
        <Rating name={rating.skill.toString()} value={rating.rating} readOnly />
      </TableCell>
      <TableCell align="right">
        {feedback ? (
          <div>
            <TextField
              fullWidth
              id="feedback"
              label="Rückmeldung"
              onKeyPress={handleFeedback}
              InputProps={{ endAdornment: <Send color="primary" /> }}
            />
          </div>
        ) : (
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button color="primary" onClick={() => onChange(rating.skill)}>
              Bestätigen
            </Button>
            <Button color="secondary" onClick={() => setFeedback(true)}>
              Rückmelden
            </Button>
          </ButtonGroup>
        )}
      </TableCell>
    </TableRow>
  );
};

const ProfileRow = ({ user, id }: { user: Profile; id: number }) => {
  const classes = useStyles();
  const [skills, setSkills] = useState(user.skills);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (skills.length === 0) setExpanded(false);
  }, [skills]);

  const handleChange = (skillId: number) => {
    setSkills(skills.filter((skill) => skill.skill !== skillId));
  };

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary
        className={classes.summary}
        expandIcon={<ExpandMore />}
        id={id.toString()}
      >
        <Avatar
          className={classes.avatar}
          alt="{user.name}"
          src={user.avatar}
        />
        <Typography className={classes.heading}>{user.name}</Typography>
        <div className={classes.completion}>
          <LinearProgressWithLabel value={user.completion} />
        </div>
        {skills.length > 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "20%",
              justifyContent: "right",
            }}
          >
            <Chip label={skills.length} color="secondary" />
          </div>
        ) : null}
      </AccordionSummary>
      <AccordionDetails style={{ padding: 0 }}>
        <Table>
          <TableBody>
            {skills.map((skill) => (
              <SkillRow
                rating={skill}
                key={skill.skill}
                onChange={handleChange}
              />
            ))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
};

export const Team = () => {
  getSkills();
  return (
    <div>
      {profiles.map((profile, index) => (
        <ProfileRow user={profile} id={index} key={profile.name} />
      ))}
    </div>
  );
};

export default Team;
