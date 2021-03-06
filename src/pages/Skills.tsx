import { ChangeEvent, useState, Fragment } from "react";
import {
  Paper,
  Grid,
  Tooltip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Info, Check, PersonPin, Feedback } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import { SkillsTree } from "../components";
import {
  Skill,
  getSkills,
  getRatings,
  getRating,
  Rating as RatingType,
} from "../providers/Skills";

interface SkillsTableProps {
  skills: Skill[];
}

interface TableIconProps {
  status: number;
}

interface SkillRowProps {
  id: number;
  name: string;
  description?: string;
  rating: RatingType;
}

const SkillRow = (props: SkillRowProps) => {
  const [row, setRow] = useState({
    status: props.rating.status,
    value: props.rating.rating,
  });

  const handleChange = (_: ChangeEvent<{}>, value: number | null) => {
    props.rating.rating = value || 0;
    props.rating.status = 1;
    setRow({ value: props.rating.rating, status: props.rating.status });
  };

  return (
    <TableRow key={props.id}>
      <TableCell>
        <InfoIcon text={props.description} />
      </TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>
        <Rating
          name={props.id.toString()}
          value={row.value}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <TableIcon status={row.status} />
      </TableCell>
    </TableRow>
  );
};

const TableIcon = (props: TableIconProps) => {
  switch (props.status) {
    case 1:
      return <PersonPin style={{ color: "#9999cc" }} />;
    case 2:
      return <Check style={{ color: "#559955" }} />;
    case 3:
      return (
        <Tooltip
          title={"Python 2.7 zählt nicht. Bitte korrigieren."}
          placement="left"
          arrow
        >
          <Feedback style={{ color: "#cccc55" }} />
        </Tooltip>
      );
    default:
      return null;
  }
};

const InfoIcon = ({ text }: { text?: string }) => {
  if (!text) return null;
  else if (text === "sprache")
    return (
      <Tooltip
        title={
          <Fragment>
            {"3 Sterne = B2"}
            <br />
            {"4 Sterne = C2"}
            <br />
            {"5 Sterne = Muttersprachler"}
          </Fragment>
        }
        placement="left"
        arrow
      >
        <Info style={{ color: "#cccccc" }} />
      </Tooltip>
    );
  return (
    <Tooltip title={text} placement="left" arrow>
      <Info style={{ color: "#cccccc" }} />
    </Tooltip>
  );
};

const SkillsTable = (props: SkillsTableProps) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell style={{ width: "36px" }}></TableCell>
          <TableCell>Kompetenz</TableCell>
          <TableCell>Ausprägung</TableCell>
          <TableCell style={{ width: "26px" }}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.skills.map((skill) => (
          <SkillRow
            key={skill.id.toString()}
            name={skill.name}
            description={skill.description}
            id={skill.id}
            rating={getRating(skill.id)}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export const Skills = () => {
  const [selection, setSelection] = useState([] as Skill[]);
  const skills = getSkills().filter((skill) => skill.children.length === 0);
  getRatings();

  return (
    <Paper style={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}></Grid>
        <Grid item sm={4} xs={12}>
          <SkillsTree onSkillSelect={setSelection} />
        </Grid>
        <Grid item sm={8} xs={12}>
          <SkillsTable skills={selection.length > 0 ? selection : skills} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Skills;
