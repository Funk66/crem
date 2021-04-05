import { ChangeEvent, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Tooltip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Check, PersonPin, Feedback } from "@material-ui/icons";
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
  rating: RatingType;
  type: string;
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

  // TODO: skill.type == 'rating' ? Rating : Toggle
  return (
    <TableRow key={props.id}>
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

const SkillsTable = (props: SkillsTableProps) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
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
            id={skill.id}
            type={skill.type}
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
    <Card style={{ flexGrow: 1 }}>
      <CardHeader title="Meine Kompetenzen" />
      <CardContent style={{ padding: 0 }}>
        <Grid container>
          <Grid item xs={12}></Grid>
          <Grid item sm={4} xs={12}>
            <SkillsTree onSkillSelect={setSelection} />
          </Grid>
          <Grid item sm={8} xs={12}>
            <SkillsTable skills={selection.length > 0 ? selection : skills} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Skills;
