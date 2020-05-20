// QUESTION 2

const sanitize = (input) => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// QUESTION 3

const getUsers = (data, action, start_time, end_time) => {
  // Using Array's 'reduce' method to create results array
  return data.reduce((acc, curr) => {
    if (
      !acc.includes(curr.user_id) &&
      curr.action === action &&
      curr.date_actioned >= start_time &&
      curr.date_actioned <= end_time
    ) {
      // Only push user_id into results array when satisfies the if statement
      // Doesn't include a user_id more than once
      acc.push(curr.user_id);
      return acc;
    }
    return acc;
  }, []);
};

/* 
Shortcomings/limitations:
- O(n*m) runtime, as nested for loops (Array.includes inside reduce function)
- Runtime will increase considerably as records array grows
*/

// QUESTION 4

const getPlaybackTime = (user_id, data) => {
  let last_date_actioned; // stores date_actioned for next iteration
  let devicesPlaying = 0; // tracks if any devices are currently playing

  // Using Array's 'reduce' method to add up playback time
  return data.reduce((acc, curr) => {
    if (curr.user_id === user_id) {
      // only focus on records with specific user_id
      if (devicesPlaying !== 0) {
        // if at least 1 device is playing
        acc += curr.date_actioned - last_date_actioned;
        // add difference between current and last timestamp to accumulator
      }
      devicesPlaying +=
        curr.action === 'start' ? 1 : curr.action === 'stop' ? -1 : 0;
      // if action is start, add 1 to devicesPlaying
      // if action is stop, minus 1 from devicesPlaying
      last_date_actioned = curr.date_actioned;
      // store current timestamp for next iteration
      return acc;
    }
    return acc; // return accumulator as is, if user_id does not match input
  }, 0);
};

/* 
Shortcomings/limitations:
- O(n) runtime
- Runtime will increase linearly with increasing records array length
*/
