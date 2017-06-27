export default function(props) {
  const { 
    onCellClick,
    rowNumber,
    striped,
    selected, 
    onRowClick, 
    onCellHover, 
    onRowHover, 
    onRowHoverExit, 
    onCellHoverExit, 
    hoverable, 
    children,
    ...rest } = props;

    return rest;
}