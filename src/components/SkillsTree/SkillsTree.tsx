import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TreeView, TreeItem } from "@material-ui/lab";
import { ExpandMore, ChevronRight } from "@material-ui/icons";
import { Skill, getSkills, getSkill } from "../../providers/Skills";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      flexGrow: 1,
      maxWidth: 400,
      overflow: "auto",
    },
  })
);

interface SkillsTreeProps {
  onSkillSelect?: (skills: Skill[]) => void;
}

export const SkillsTree = (props: SkillsTreeProps) => {
  const classes = useStyles();
  const skills = getSkills();

  const treeItems = (skills: Skill[]) =>
    skills.map((skill) => (
      <TreeItem nodeId={skill.id.toString()} label={skill.name} key={skill.id}>
        {skill.children.length > 0 ? treeItems(skill.children) : null}
      </TreeItem>
    ));

  const getChildren = (skill: Skill, children: Skill[]): Skill[] => {
    if (skill.children.length > 0)
      skill.children.forEach((skill) => getChildren(skill, children));
    else if (!children.includes(skill)) children.push(skill);
    return children;
  };

  const handleSelection = (_: any, nodeIds: string[]) => {
    const selection: Skill[] = [];
    if (props.onSkillSelect) {
      nodeIds.forEach((skillId) => {
        selection.push(...getChildren(getSkill(skillId), []))
      });
      console.log(selection)
      props.onSkillSelect(selection);
    }
  };

  return (
    <TreeView
      multiSelect
      onNodeSelect={handleSelection}
      className={classes.root}
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
    >
      {treeItems(skills.filter((skill) => !skill.parent))}
    </TreeView>
  );
};

export default SkillsTree;
