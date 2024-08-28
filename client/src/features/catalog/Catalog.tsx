import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layouts/LoadingComponent";
import { UseAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./CatalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckBoxGroup from "../../app/components/CheckBoxGroup";
import AddPagination from "../../app/components/AddPagination";

export default function Catalog(){
    const sortOptions = [
      {value:'name',label:'Alphabetical'},
      {value:'priceDesc',label:'Price-High to Low'},
      {value:'price',label:'Price-Low to High'}
    ];
    const dispatch = UseAppDispatch();
    const products = useAppSelector(productSelectors.selectAll);
    const {productLoaded, filtersLoaded,types,brands,productParams,metaData} = useAppSelector(state=>state.catalog);

    useEffect(()=>{
    if(!productLoaded) dispatch(fetchProductsAsync());
  }, [productLoaded,dispatch])
  useEffect(()=>{
    if(!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded,dispatch])
  

  if(!filtersLoaded) return( <LoadingComponent message="Loading Products..."/>)
    return (
        <>
        <Grid container columnSpacing={4}>
          <Grid item xs={3}>
            <Paper sx={{mb:2}}>
              <ProductSearch/>
            </Paper>
            <Paper sx={{mb:2,p:2}}>
              <RadioButtonGroup options={sortOptions} 
              onchange={(e)=>dispatch(setProductParams({orderBy:e.target.value}))} 
              selectedValue={productParams.orderBy}/>
            </Paper>
            <Paper sx={{mb:2,p:2}}>
            <CheckBoxGroup 
            items={brands} 
            checked={productParams.brands} 
            onChange={(items:string[])=>dispatch(setProductParams({brands:items}))}
            ></CheckBoxGroup>
          </Paper>
          <Paper sx={{mb:2,p:2}}>
            <CheckBoxGroup 
            items={types}
            checked={productParams.types}
            onChange={(items:string[])=>dispatch(setProductParams({types:items}))}
            />
          </Paper>
          </Grid>
          <Grid item xs={9}>
          <ProductList products={products} />
          </Grid>
            <Grid item xs={3} />
            <Grid item xs={9} sx={{mb:2}}>
              {metaData &&
              <AddPagination 
              metaData={metaData}
              onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber:page}))}
              />
              }
          </Grid>
        </Grid>
        {}
        </>
    )
}

/*
    const [products,setProducts] = useState<Product[]>([]);
    const [loading,setLoading] = useState(true);

      useEffect(()=>{
    agent.catalog.list()
    .then(products=> setProducts(products))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))
  }, [])

    function addProduct()
  {
    setProducts(prevState => [...prevState,{
      id:prevState.length+1,
      name:'product'+(prevState.length+1),
      price:(prevState.length)*100+100,
      brand:'Some Brand',
      description:'Description of something',
      pictureUrl:'http://picsum.photos/200',
    }]);
  }

 <Button variant='outlined'>Add Product</Button> 
 
 <FormGroup >
            <Typography variant="h6">Type</Typography>
            {types.map(
              (type)=>(
                <FormControlLabel control={<Checkbox />} label={type} key={type} />
              )
            )}
          </FormGroup>
 
 */