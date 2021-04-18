import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Rating, Autocomplete } from "@material-ui/lab";
import {
  userRatings,
  Skill,
  getSkills,
  findUserBySkill,
} from "../providers/Skills";

const SearchResults = ({
  data,
  columns,
}: {
  data: any[];
  columns: string[];
}) => {
  return (
    <Card>
      <CardHeader title="Ergebnisse" />
      <CardContent style={{ padding: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Ansprechpartner</TableCell>
              {columns.map((column) => (
                <TableCell key={Math.random().toString()}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id.toString()}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.superior}</TableCell>
                {user.skills.map((skillLevel: number) => (
                  <TableCell key={Math.random().toString()}>
                    <Rating
                      style={{ marginTop: 2 }}
                      size="small"
                      readOnly
                      value={skillLevel}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

interface SkillQuery {
  skill: Skill;
  rating: number;
}

const Query = ({
  skills,
  query,
  onChange,
  boxId,
}: {
  skills: Skill[];
  query: SkillQuery | null;
  onChange: any;
  boxId: string;
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      style={{ marginBottom: 16 }}
    >
      <Autocomplete
        autoHighlight
        autoSelect
        onChange={(_, value) => {
          let tempValue: SkillQuery | null;
          if (value)
            tempValue = { skill: value, rating: query ? query.rating : 1 };
          else tempValue = null;
          onChange(tempValue);
        }}
        style={{ flexGrow: 1 }}
        size="small"
        id={boxId}
        value={query ? query.skill : null}
        options={skills}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Kompetenz" variant="outlined" />
        )}
      />
      {query && query.skill.type === "rating" ? (
        <Rating
          value={query.rating}
          name={Math.random().toString()}
          onChange={(_, value) => {
            onChange({ skill: query.skill, rating: value || 0 });
          }}
        />
      ) : null}
    </Box>
  );
};

export const Search = () => {
  const skills = getSkills().filter((skill) => skill.children.length === 0);
  const [queries, setQueries] = useState<{ skill: Skill; rating: number }[]>(
    []
  );
  const [searched, setSearched] = useState(false)
  const [results, setResults] = useState<any>([]);

  const execSearch = () => {
    const searchQuery = queries.map((query) => ({
      skill: query.skill.id,
      rating: query.rating,
    }));
    const users = findUserBySkill(searchQuery);
    const ratedUsers = users.map((user) => ({
      id: user.id,
      superior: user.superior,
      skills: queries.map(
        (query) => userRatings[user.id][query.skill.id].rating
      ),
    }));
    setResults(ratedUsers);
    setSearched(true)
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title="Suchanfrage" />
          <CardContent>
            {queries.map((query) => (
              <Query
                key={Math.random().toString()}
                skills={skills}
                query={query}
                boxId={query.skill.name}
                onChange={(value: { skill: Skill; rating: number } | null) => {
                  let position = queries.indexOf(query);
                  queries.splice(position, 1);
                  if (value) {
                    queries.splice(position, 0, value);
                  }
                  setQueries([...queries]);
                }}
              />
            ))}
            <Query
              key="empty"
              boxId="empty"
              skills={skills}
              query={null}
              onChange={(value: { skill: Skill; rating: number } | null) => {
                if (value) setQueries(queries.concat([value]));
              }}
            />
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              disabled={queries.length === 0}
              style={{ flexGrow: 1 }}
              onClick={execSearch}
            >
              Suchen
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        {searched ? (
          <SearchResults
            data={results}
            columns={queries.map((query) => query.skill.name)}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Search;
