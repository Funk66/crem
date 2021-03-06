export interface SkillType {
  id: number;
  name: string;
  parent?: number;
  description?: string;
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

export function getSkills(): Map<number, Skill> {
  const mapping: Map<number, Skill> = new Map(
    skills.map((skill) => [skill.id, { ...skill, children: [] }])
  );
  mapping.forEach((skill) => {
    if (skill.parent) mapping.get(skill.parent)!.children.push(skill);
  });
  return mapping;
}

export function getRatings() {
  return new Map<number, Rating>(
    ratings.map((rating) => [rating.skill, rating])
  );
}

export const skills: SkillType[] = [
  { name: "Programmierung", parent: undefined, id: 1 },
  { name: "Java", parent: 1, id: 2 },
  { name: "Python", parent: 1, id: 3 },
  { name: "C++", parent: 1, id: 4 },
  { name: "Typescript", parent: 1, id: 5 },
  { name: "Sprachen", parent: undefined, id: 6 },
  { name: "Deutsch", parent: 6, id: 7 },
  { name: "Spanisch", parent: 6, id: 8 },
  { name: "Englisch", parent: 6, id: 9 },
  { name: "Andere", parent: undefined, id: 10 },
  { name: "Software", parent: 10, id: 11 },
  { name: "Matlab", parent: 11, id: 12 },
  { name: "Catia", parent: 11, id: 13 },
  { name: "Office", parent: 11, id: 14 },
  { name: "MS Word", parent: 14, id: 15 },
  { name: "MS Excel", parent: 14, id: 16 },
];

export const ratings: Rating[] = [
  { skill: 1, rating: 0, status: 0 },
  { skill: 2, rating: 2, status: 1 },
  { skill: 3, rating: 5, status: 1 },
  { skill: 4, rating: 0, status: 0 },
  { skill: 5, rating: 1, status: 2 },
  { skill: 6, rating: 3, status: 0 },
  { skill: 7, rating: 5, status: 1 },
  { skill: 8, rating: 0, status: 1 },
  { skill: 9, rating: 4, status: 0 },
  { skill: 10, rating: 0, status: 0 },
  { skill: 11, rating: 0, status: 0 },
  { skill: 12, rating: 1, status: 1 },
  { skill: 13, rating: 3, status: 1 },
  { skill: 14, rating: 0, status: 0 },
  { skill: 15, rating: 4, status: 1 },
  { skill: 16, rating: 1, status: 1 },
];
