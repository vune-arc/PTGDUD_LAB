// src/components/Content.jsx
import React from 'react';
import Overview from './Overview';
import Table from './Table';
import OverviewGetData from './OverviewGetData';
function Content () {
  return (
    <main className="flex-1 p-6 bg-gray-100">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-5 ">
        {/* <Overview/> */}
         <OverviewGetData/>
      </div>

      {/* Detailed Report */}
      <div >
        <Table/>
      </div>

    </main>
  );
};

export default Content;
