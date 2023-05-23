const postMatchBody = {
  "homeTeamId": 16, // O valor deve ser o id do time
  "awayTeamId": 8, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
};

const postMatchBodySameTeam = {
  "homeTeamId": 8,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
};

const postMatchBodyNonExistentTeam = {
  "homeTeamId": 999,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
};

export default { postMatchBody, postMatchBodySameTeam, postMatchBodyNonExistentTeam };
