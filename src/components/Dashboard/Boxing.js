import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, CardMedia } from '@mui/material'
import { GoGraph } from "react-icons/go";
import { styled } from '@mui/material/styles';
import api from '../../api/posts';
import TruncateMarkup from "react-truncate-markup";
import { Markup } from 'interweave';

const fTitle = { xs: '18px', sm: '18px', md: '12px', lg: '10px', xl: '15px' }
const fSubtitle = { xs: '12px', sm: '12px', md: '10px', lg: '8px', xl: '12px' }
const fText = { xs: '20px', sm: '25px', md: '20px', lg: '15px', xl: '25px' }
const f200 = { xs: '25px', sm: '30px', md: '20px', lg: '20px', xl: '30px' }

const colors = '#472CC9'

const Item = styled(Box)(() => ({
    border: '1px solid #797E7F',
    borderRadius: 30,
    height: 280,
    padding: 25,
}))

const Border = styled(Box)(() => ({
    border: '2px solid #797E7F',
    borderRadius: 5,
}))

const Title = styled(Typography)(() => ({
    color: '#797E7F',
    fontWeight: 'bold',
    marginTop: 1,
    fontSize: fTitle,
}))
const SubTitle = styled(Typography)(() => ({
    color: '#797E7F',
    marginTop: 1,
    fontSize: fSubtitle,
}))

const NextText = styled(Typography)(() => ({
    color: colors,
    fontWeight: 'bold',
    marginTop: 10,
}))

const Status = styled(GoGraph)(() => ({
    color: colors,
    marginTop: 10,
    width: 250,
    height: 220,
    borderRadius: 10,

}))

const Status1 = styled(GoGraph)(() => ({
    color: '#797E7F',
    marginTop: 10,
    width: 250,
    height: 220,
    borderRadius: 10,

}))

const TextPro = styled(Typography)(() => ({
    color: colors,
    fontWeight: 'bold',
    fontSize: fText,

}))

function Boxing() {

    const [totalView, setTotalView] = useState(null)
    const [totalLike, setTotalLike] = useState(null)
    const [topView, setTopView] = useState([])
    const [topLike, setTopLike] = useState([])
    const [doc, setDoc] = useState("");

    useEffect(() => {

       
        async function fetchData() {
            // You can await here
            await api.get('/api/cms/dashboard/getTopViews').then((res) => {
                console.log(res?.data?.docs, 'Topviews')
                if(res?.data?.docs) {
                    setTopView(res?.data?.docs)
                } else {
                    setTopView([])
                }
    
            })
            await api.get('/api/cms/dashboard/getTopLike').then((res) => {
                console.log(res?.data?.docs , 'boxing')           
                if(res?.data?.docs) {
                    setTopLike(res?.data?.docs)
                } else {
                    setTopLike({})
                }
    
            })
    
            await api.get('/api/cms/dashboard/getTotalView').then((res) => {
                console.log(res?.data?.totalViews , "totalView")
                setTotalView(res?.data?.totalViews)
            })

            await api.get('/api/cms/dashboard/getTotalLike').then((res) => {
                console.log(res?.data?.totalLike )
                setTotalLike(res?.data?.totalLike)
    
            })

        }
        fetchData(); 
        

    }, [])

    return (
        
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <NextText sx={{ fontSize: f200 }}>
                    30 Days Performance
                </NextText>
            </Grid>

            {/*TotalViews*/}
            <Grid item xs={12} sm={6} md={4} lg={3} >
                <Item sx={{ display: 'flex' }}>
                    <Status>
                        <GoGraph />
                    </Status>

                    <Grid container >
                        <Grid item xs={6}>
                            <TextPro sx={{ fontSize: fText, mt: 10 }}>
                                {totalView !== null ? totalView : 0 }
                            </TextPro>
                            <TextPro sx={{ fontSize: fText }}>
                                Views
                            </TextPro>
                        </Grid>
                    </Grid>
                </Item>
            </Grid>

            {/*TotalLikes*/}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Item sx={{ display: 'flex' }} >
                    <Status1>
                        <GoGraph />
                    </Status1>
                    <Grid container >
                        <Grid item xs={6}>
                            <TextPro sx={{ fontSize: fText, mt: 10 }}>
                                {totalLike !== null ? totalLike : 0 }
                            </TextPro>
                            <TextPro sx={{ fontSize: fText }}>
                                Likes
                            </TextPro>
                        </Grid>
                    </Grid>
                </Item>
            </Grid>

            {/*TopViews*/}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Item sx={{ display: 'flex' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextPro sx={{ fontSize: fText }}>
                                Top Views
                            </TextPro>
                        </Grid>

                        {topView.map((item, index) => (
                            <>
                                <Grid xs={10}>
                                    <Title sx={{ fontSize: fTitle , fontFamily: "Khmer OS Siemreap"}}>
                                        
                                        <TruncateMarkup lines={2}>
                                            <div> {item?.title.replace(/<\/?(?!a)(?!p)(?!img)\w*\b[^>]*>/ig, '')}</div>
                                        </TruncateMarkup>

                                    </Title>
                                    <SubTitle sx={{ fontSize: fSubtitle }}>
                                        
                                    </SubTitle>

                                </Grid>
                                <Grid item xs={2}>
                                    <Border >
                                        <CardMedia
                                            component="img"
                                            height="40"
                                            image={`${item.thumbnail}`}
                                        />
                                    </Border>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </Item>
            </Grid>


            {/*TopLikes*/}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Item sx={{ display: 'flex' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextPro sx={{ fontSize: fText }}>
                                TopLike
                            </TextPro>
                        </Grid>
                        
                        {topLike.map((item, index) => (
                            <>
                                <Grid item xs={10} >
                                    <Title sx={{ fontSize: fTitle , fontFamily: 'Khmer OS Siemreap' }}>
                                        
                                        <TruncateMarkup lines={2}>
                                            <div> {item?.title.replace(/<\/?(?!a)(?!p)(?!img)\w*\b[^>]*>/ig, '')}</div>
                                        </TruncateMarkup>                                       
                                    </Title>
                                    <SubTitle sx={{ fontSize: fSubtitle }}>

                                    </SubTitle>
                                </Grid>

                                <Grid item xs={2} >
                                    <Border >
                                        <CardMedia
                                            component="img"
                                            height="40"
                                            image={`${item.thumbnail}`}
                                        />
                                    </Border>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </Item>

            </Grid>

        </Grid>
    )
}

export default Boxing