import React from 'react';

function QueueTypeForm() {

  const getSection = (queueType) => {
    if (queueType === "Division") return divisionSection;
    if (queueType === "Wins") return winSection;
    if (queueType === "Ranked Games") return rankedGameSection;
    if (queueType === "Normal Games") return normalGameSection;
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={queueType}
            onChange={handleQueueTypeChange}
            label="Type"
          >
            <MenuItem value="Division">Division</MenuItem>
            <MenuItem value="Wins">Wins</MenuItem>
            <MenuItem value="Ranked Games">Ranked Games</MenuItem>
            <MenuItem value="Normal Games">Normal Games</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {getSection(queueType)}
    </Grid>
  );
};

export default QueueTypeForm;