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
  user: string;
  rated?: Date; // by user
  checked?: Date; // by manager
}

export interface Skill extends SkillType {
  children: Skill[];
}

export interface SearchQuery {
  skill: number;
  rating: number;
}

export interface User {
  name: string;
  sex: string;
  email: string;
  id: string;
  superior?: string;
  location: string;
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

const skills: SkillType[] = require("./skills.json");
const ratings: Rating[] = require("./ratings.json");
const users: User[] = require("../Skills/users.json");
const userMap: { [userId: string]: User } = Object.create(null);
users.forEach((user) => {
  userMap[user.id] = user;
});
const fakeRatings: Rating[] = require("./fakeratings.json");
export const userRatings: {
  [userId: string]: { [ratingId: number]: { rating: number; status: number } };
} = Object.create(null);
users.forEach((user) => {
  userRatings[user.id] = Object.create(null);
});
fakeRatings.forEach((rat) => {
  let { skill, rating, status } = rat;
  userRatings[rat.user][skill] = { rating, status };
});

export function findUserBySkill(query: SearchQuery[]): User[] {
  let filteredUsers: User[] = [];
  for (const [userId, ratings] of Object.entries(userRatings)) {
    let match = query.every((criteria) => {
      if (
        ratings[criteria.skill] &&
        ratings[criteria.skill].rating >= criteria.rating
      )
        return true;
      else return false;
    });
    if (match) filteredUsers.push(userMap[userId]);
  }
  return filteredUsers;
}
