import React from 'react';
import GoalsSection from '../components/GoalsSection';

function GoalsPage({ summary }) {
  return (
    <div>
      <GoalsSection summary={summary} />
    </div>
  );
}

export default GoalsPage;