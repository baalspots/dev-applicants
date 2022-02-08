import React, { useEffect,useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getLCP, getFID, getCLS } from "web-vitals";
import { GridWrap, GridRow, GridColumn } from "emotion-flex-grid";

if (typeof window !== "undefined") {
  getCLS(console.log);
  getFID(console.log);
  getLCP(console.log);

  const Axe = require("@axe-core/react");
  Axe(React, 1000);
}

// feature component
function FeatureComponent(props) {
  let { title,description,buttonText } = props;
  return (
    <div className='featureComponment'>
      <div className="featureComponmentTitle">{title}</div>
      <div className="featureComponmentDescription">{description} </div>
      <div className="featureComponmentButtonText"> <a href=""> {buttonText} </a> </div>
    </div>
  );
};

// each row
function FeatureRow(props) {
  var rowData = props.rowList;
  var temp = [];

  rowData.forEach((element,index) => {
    let {title,description} = element;

    temp.push(
      <GridColumn key={"column_"+index} width={4}>
         <FeatureComponent key={index} title={title} description={description} buttonText="Learn more"/>  
      </GridColumn>  
    )
  });

  return temp;
}

function App() {
  const [featureList,setFeatureList] = useState([]);

  function updatedList(numRow,result) {
    var newList = [];
    while (result.length > 0) {
      newList.push(result.splice(0, numRow));
    }

    return newList;
  };

  // when the App loads
  useEffect(() => {
    fetch('https://mocki.io/v1/b9c63035-97c5-40a0-b45c-2abdf5261bdf')
      .then(res => res.json()) // parsing the data to json
      .then(
        (result) => {
             if(Array.isArray(result) && result.length !== 0) {
              // first 6 element
              var result = result.slice(0,6);
              var updatedResult = updatedList(3,result);
              var rowTemplate = [];

              updatedResult.forEach(
                (row,index) => {
                    rowTemplate.push(
                      <GridRow className="featureRow" key={"row_"+index}>
                        <FeatureRow
                          rowList={row}
                        />
                      </GridRow>  
                    );
                }
              );
              setFeatureList(rowTemplate);   
        }
      }
        ,
        () => {
          alert("cannot connect to service");
        }
      );
  });

  // main template
  return (    
    <div className="App">
      <div className ='feature'>
        <p>Experience The Cardo </p>
        { featureList }
      </div>
    </div>
  );
}

export default App;
