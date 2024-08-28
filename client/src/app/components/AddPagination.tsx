import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/Pagination";

interface Props{
    metaData: MetaData
    onPageChange:(page:number)=>void
}
export default function AddPagination({metaData,onPageChange}:Props)
{
    const {currentPage,totalCount,totalPages,pageSize}=metaData;
    return(
        <Box display= "flex" justifyContent="space-between" alignItems="center">
                <Typography>
                  Displaying {(currentPage-1*pageSize)+1>totalCount?totalCount:((currentPage-1)*pageSize)+1}-
                  {(pageSize*currentPage)>totalCount?
                  totalCount:currentPage*pageSize} items of {totalCount} items
                </Typography>
              <Pagination
              color="primary"
              count={totalPages}
              page={currentPage}
              onChange={(_e,page)=>onPageChange(page)}
              size="large"
              />
      </Box>
    )
}