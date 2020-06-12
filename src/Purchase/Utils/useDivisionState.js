import React from 'react';
import useTierState from './Hooks/useTierState';
import useInitialDivisionState from './Hooks/useInitialDivisionState';
import useLPState from './Hooks/useLPState';

const useDivisionState = () => {

  const {tier, setTier} = useTierState(3);
  const {division, setDivision} = useInitialDivisionState(1);
  const {LP, setLP} = useLPState('0-20');
  const [desiredTier, setDesiredTier] = React.useState(4);
  const [desiredDivision, setDesiredDivision] = React.useState(4);

  React.useEffect(() => {
    if (tier === 6 && division === 1) {
      setDivision(2);
      setDesiredTier(6);
      setDesiredDivision(1);
    } else if (tier > desiredTier && division === 1) {
      setDesiredTier(tier + 1);
    } else if (tier > desiredTier && division < desiredDivision) {
      setDesiredTier(tier);
      setDesiredDivision(division - 1);
    } else if (tier > desiredTier) {
      setDesiredTier(tier);
    } else if (tier === desiredTier && division === 1) {
      setDesiredTier(tier + 1);
      setDesiredDivision(4);
    } else if (tier === desiredTier && division <= desiredDivision) {
      setDesiredDivision(division - 1);
    };
  }, [tier, setTier, desiredTier, division, setDivision, desiredDivision])

  const handleTierChange = event => {
    setTier(event.target.value);
  };

  const handleDivisionChange = event => {
    setDivision(event.target.value);
  };

  const handleLPChange = event => {
    setLP(event.target.value);
  };

  const handleDesiredTierChange = event => {
    setDesiredTier(event.target.value);
  };

  const handleDesiredDivisionChange = event => {
    setDesiredDivision(event.target.value);
  };

  return {
    tier,
    desiredTier,
    division,
    desiredDivision,
    LP,
    handleTierChange,
    handleDivisionChange,
    handleLPChange,
    handleDesiredTierChange,
    handleDesiredDivisionChange
  };

}

export default useDivisionState;