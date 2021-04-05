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

export const ratings: Rating[] = [
  { skill: 1, rating: 0, status: 0 },
  { skill: 2, rating: 2, status: 1 },
  { skill: 3, rating: 4, status: 3 },
  { skill: 4, rating: 0, status: 0 },
  { skill: 5, rating: 1, status: 2 },
  { skill: 6, rating: 3, status: 2 },
  { skill: 7, rating: 5, status: 2 },
  { skill: 8, rating: 0, status: 0 },
  { skill: 9, rating: 4, status: 2 },
  { skill: 10, rating: 0, status: 0 },
  { skill: 11, rating: 0, status: 0 },
  { skill: 12, rating: 1, status: 2 },
  { skill: 13, rating: 3, status: 1 },
  { skill: 14, rating: 0, status: 0 },
  { skill: 15, rating: 4, status: 2 },
  { skill: 16, rating: 1, status: 2 },
];

const skills: SkillType[] = require('./skills.json')
