export interface SkillType {
  id: number;
  name: string;
  parent?: number;
  type: string;
}

export interface Rating {
  skill: number;
  rating: number;
  status: number;
  rated?: Date; // by user
  checked?: Date; // by manager
}

export interface Skill extends SkillType {
  children: Skill[];
}

const skillMap: { [skillId: number]: Skill } = Object.create(null);
const skillArray: Skill[] = [];
const ratingMap: { [skillId: number]: Rating } = Object.create(null);

export function getSkills(): Skill[] {
  if (skillArray.length == 0) {
    skills.forEach((skill) => {
      let sk = { ...skill, children: [] };
      skillArray.push(sk);
      skillMap[skill.id] = sk;
    });
    skillArray.forEach((skill) => {
      if (skill.parent) skillMap[skill.parent].children.push(skill);
    });
  }
  return skillArray;
}

export function getSkill(skillId: string | number): Skill {
  if (typeof skillId === "string") skillId = parseInt(skillId);
  return skillMap[skillId];
}

export function getRatings() {
  ratings.forEach((rating) => (ratingMap[rating.skill] = rating));
}

export function getRating(skillId: number) {
  return ratingMap[skillId] || { skill: skillId, rating: 0, status: 0 };
}

const skills: SkillType[] = require('./skills.json')
const ratings: Rating[] = require('./ratings.json')
