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
import { Skill, getSkills } from "../providers/Skills";

const SearchResults = () => {
  return (
    <Card>
      <CardHeader title="Ergebnisse" />
      <CardContent style={{ padding: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Python</TableCell>
              <TableCell>Englisch</TableCell>
              <TableCell>Catia</TableCell>
              <TableCell>Ansprechpartner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((user) => (
              <TableRow key={user.id.toString()}>
                <TableCell>{user.id}</TableCell>
                {user.skills.map((skillLevel) => (
                  <TableCell>
                    <Rating
                      style={{ marginTop: 2 }}
                      size="small"
                      readOnly
                      value={skillLevel}
                    />
                  </TableCell>
                ))}
                <TableCell>{user.superior}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const Query = ({ skills, onChange }: { skills: Skill[]; onChange: any }) => {
  const [rating, setRating] = useState(0);
  const [selected, setSelected] = useState(false);

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
        onChange={(_, value) => setSelected(!!value)}
        style={{ flexGrow: 1 }}
        size="small"
        id="skills"
        options={skills}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Kompetenz" variant="outlined" />
        )}
      />
      <Rating
        value={rating}
        name={Math.random().toString()}
        disabled={!selected}
        onChange={(_, value) => {
          setRating(value || 0);
          onChange(value);
        }}
      />
    </Box>
  );
};

export const Search = () => {
  const skills = getSkills().filter((skill) => skill.children.length === 0);
  const [ready, setReady] = useState(false);
  const [queries, setQueries] = useState([0]);
  const [searched, setSearched] = useState(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title="Suchanfrage" />
          <CardContent>
            {queries.map((query) => (
              <Query
                key={query.toString()}
                skills={skills}
                onChange={(value: number | null) => {
                  setReady(!!value);
                  setQueries(queries.concat([queries.length]));
                }}
              />
            ))}
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              disabled={!ready}
              style={{ flexGrow: 1 }}
              onClick={() => setSearched(true)}
            >
              Suchen
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        {searched ? <SearchResults /> : null}
      </Grid>
    </Grid>
  );
};

export default Search;

const results = [
  {
    id: 1382,
    skills: [3, 4, 2],
    superior: "Friedrich Weber",
  },
  {
    id: 723,
    skills: [2, 5, 3],
    superior: "Gustav Meyer",
  },
  {
    id: 1024,
    skills: [3, 4, 1],
    superior: "Friedrich Weber",
  },
];
