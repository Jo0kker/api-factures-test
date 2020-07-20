import React from "react"
import ContentLoader from "react-content-loader"

const TableLoader = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={150}
        viewBox="0 0 400 150"
        backgroundColor="#f3f3f3"
        foregroundColor="#877d7d"
        {...props}
    >
        <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
        <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
        <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
        <rect x="25" y="102" rx="5" ry="5" width="220" height="10" />
        <rect x="24" y="128" rx="5" ry="5" width="220" height="10" />
    </ContentLoader>
)

export default TableLoader