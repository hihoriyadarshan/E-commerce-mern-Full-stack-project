import React from 'react'
import Helmat from "react-helmet"

const MetaData = ({title}) => {
  return (
    <Helmat>
        <title>{title}</title>
    </Helmat>
  );
};

export default MetaData
