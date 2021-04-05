import { useState, ChangeEvent } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  TextField,
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
} from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import { ExpandMore, ChevronRight } from "@material-ui/icons";
import { Skill, getSkills, getSkill } from "../providers/Skills";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      minWidth: 200,
      overflow: "auto",
    },
  })
);

const treeItems = (skills: Skill[]) =>
  skills.map((skill) => (
    <TreeItem nodeId={skill.id.toString()} label={skill.name} key={skill.id}>
      {skill.children.length > 0 ? treeItems(skill.children) : null}
    </TreeItem>
  ));

export const Account = () => {
  const classes = useStyles();
  const skills = getSkills();
  const [category, setCategory] = useState("");

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={4}>
        <Card>
          <CardHeader title="Kompetenz erstellen" />
          <CardContent>
            <Box display="flex">
              <TreeView
                onNodeSelect={(_: ChangeEvent<{}>, nodeIds: string) => {
                  let skill = getSkill(nodeIds);
                  let category = skill.name;
                  while (skill.parent) {
                    skill = getSkill(skill.parent);
                    category = `${skill.name}/${category}`;
                  }
                  setCategory(category);
                }}
                className={classes.root}
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
              >
                {treeItems(skills.filter((skill: Skill) => !skill.parent))}
              </TreeView>
              <Box flexGrow={1}>
                <TextField
                  fullWidth
                  value={category}
                  label="Kategorie"
                  id="category"
                />
                <TextField fullWidth label="Name" id="name" />
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary">
                Erstellen
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="Benutzer einladen" />
          <CardContent>
            <TextField fullWidth label="Name" id="name" />
            <TextField fullWidth label="Email" id="email" />
            <TextField fullWidth label="Vorgesetzter" id="superior" />
          </CardContent>
          <CardActions>
            <Button color="primary" variant="contained">
              Einladen
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Account;
